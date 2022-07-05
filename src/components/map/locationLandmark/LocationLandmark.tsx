import React from "react";
import { Marker } from "@react-google-maps/api";
import { ILandmark } from "../../../context/landmarksContext/LandmarksContext";

interface IProps {
  landmark: ILandmark;
  onClick?: () => void;
  currentLocation?: boolean;
}

export const LocationLandmark: React.FC<IProps> = ({
  landmark,
  onClick,
  currentLocation,
}) => {
  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  return (
    <Marker
      onClick={onClick}
      position={{ lat: landmark.lat, lng: landmark.lng }}
      icon={currentLocation ? image : undefined}
    ></Marker>
  );
};
