import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./Map.module.scss";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import {
  ILandmark,
  LandmarksContext,
} from "../../context/landmarksContext/LandmarksContext";
import { LocationLandmark } from "./locationLandmark/LocationLandmark";
import { ControlBar } from "./controlBar/ControlBar";
import { mapStyle } from "./mapStyle";
import { NoteCard } from "./NoteCard/NoteCard";
import { useMap } from "./useMap";
import { useForm } from "../hooks/useForm";

const defaultLandmarkNote = {
  id: undefined,
  username: "Admin",
  note: "",
  lat: NaN,
  lng: NaN,
};

export const Map = () => {
  const { landmarks, createLandmark, editLandmark } =
    useContext(LandmarksContext);
  // const [landmarkNote, setLandmarkNote] = useState<ILandmark>(initialValue);
  const [search, , handleSearchChange, resetSearch] = useForm({ search: "" });
  const [
    landmarkNote,
    setLandmarkNote,
    handleLandmarkNoteChange,
    resetLandmarkNote,
  ] = useForm(defaultLandmarkNote);
  const [filteredLandmarks, setFilteredLandmarks] = useState(landmarks);
  const [isEditable, setIsEditable] = useState(false);
  const [open, setOpen] = useState(true);
  const mapRef = useRef<null | google.maps.Map>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCI8_Ko2BNbAclrNjO1pVG6i5Foyy8Vhq0",
  });

  const { onMapLoad, onMapClick, navigateMe, navigateTo } = useMap({
    defaultLandmarkNote,
    landmarkNote,
    mapRef,
    setLandmarkNote,
    setOpen,
  });

  const handleSaveLandmark = () => {
    if (landmarkNote.note !== "") {
      if (!landmarkNote.id) {
        createLandmark(landmarkNote);
      } else {
        editLandmark(landmarkNote);
      }
      setIsEditable(false);
    }
    return null;
  };

  const onClose = () => {
    setIsEditable(false);
    setOpen(false);
    resetLandmarkNote();
  };

  const openNote = useCallback(
    (landmark: ILandmark) => {
      setLandmarkNote(landmark);
      setOpen(true);
    },
    [setLandmarkNote, setOpen]
  );

  const onSearch = useCallback(() => {
    if (search !== "") {
      const words = search.toLocaleLowerCase().split(" ");
      const filteredItems = landmarks.filter(
        (landmark) =>
          words.includes(landmark.username.toLowerCase()) ||
          landmark.note.split(" ").some((x) => words.includes(x.toLowerCase()))
      );
      setFilteredLandmarks(filteredItems);
    } else {
      setFilteredLandmarks(landmarks);
    }
  }, [landmarks, search]);

  useEffect(() => {
    landmarkNote.lat &&
      landmarkNote.lng &&
      navigateTo({ lat: landmarkNote.lat, lng: landmarkNote.lng });
  }, [landmarkNote, navigateTo]);

  useEffect(() => {
    navigateMe();
  }, [navigateMe]);

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const makers = () => {
    if (search === "") {
      return landmarks;
    } else {
      return filteredLandmarks;
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={classes.mapContainer}>
      <GoogleMap
        options={options}
        zoom={5}
        mapContainerClassName={classes.googleMap}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <LocationLandmark currentLocation landmark={landmarkNote} />
        {makers().map((landmark, index) => (
          <LocationLandmark
            onClick={() => openNote(landmark)}
            landmark={landmark}
            key={index}
          />
        ))}
      </GoogleMap>
      <ControlBar
        clearSearch={resetSearch}
        onSearch={onSearch}
        handleSearchChange={handleSearchChange}
        search={search.search}
        navigateMe={navigateMe}
      />
      {open && (
        <NoteCard
          landmarkNote={landmarkNote}
          isEditable={isEditable}
          onChange={handleLandmarkNoteChange}
          onSave={() => handleSaveLandmark()}
          onEdit={() => setIsEditable((p) => !p)}
          onClose={onClose}
        />
      )}
    </div>
  );
};
