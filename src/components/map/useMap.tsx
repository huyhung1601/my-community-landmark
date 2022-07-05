import React, { useCallback } from "react";
import { ILandmark } from "../../context/landmarksContext/LandmarksContext";

interface IUseMap {
  defaultLandmarkNote: ILandmark;
  landmarkNote: ILandmark;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  setLandmarkNote: React.Dispatch<React.SetStateAction<ILandmark>>;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  setIsEditable: (value: React.SetStateAction<boolean>) => void;
}

export const useMap = ({
  defaultLandmarkNote,
  landmarkNote,
  mapRef,
  setOpen,
  setLandmarkNote,
  setIsEditable,
}: IUseMap) => {
  const navigateTo = useCallback(
    ({ lat, lng }: { lat: number; lng: number }) => {
      mapRef.current?.panTo({ lat, lng });
      mapRef.current?.setZoom(8);
    },
    [mapRef]
  );

  const navigateMe = useCallback(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const navigateSucces = (pos: GeolocationPosition) => {
      setOpen(true);
      const coords = pos.coords;
      const latLng = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
      navigateTo(latLng);
      setLandmarkNote((p) => ({
        ...p,
        ...latLng,
      }));
    };

    const navigateFail = (err: any) => {
      throw err;
    };
    navigator.geolocation?.getCurrentPosition(
      navigateSucces,
      navigateFail,
      options
    );
  }, [navigateTo, setOpen, setLandmarkNote]);

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      navigateTo({ lat: landmarkNote.lat, lng: landmarkNote.lng });
    },
    [mapRef, landmarkNote.lat, landmarkNote.lng, navigateTo]
  );

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      const lat = e.latLng?.lat() as number;
      const lng = e.latLng?.lng() as number;
      navigateTo({ lat, lng });
      setLandmarkNote({ ...defaultLandmarkNote, lat, lng });
      setOpen(true);
      setIsEditable(false);
    },
    [defaultLandmarkNote, setIsEditable, navigateTo, setOpen, setLandmarkNote]
  );
  return { navigateMe, onMapLoad, onMapClick, navigateTo };
};
