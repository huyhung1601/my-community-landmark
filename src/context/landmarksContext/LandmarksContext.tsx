import { createContext, FC, PropsWithChildren, useReducer } from "react";
import LandmarksReducer from "./LandmarksReducer";
import { v4 } from "uuid";

export interface ILandmark {
  id?: string;
  username: string;
  note: string;
  lat: number;
  lng: number;
}

interface ILandmarkContext {
  landmarks: ILandmark[];
  createLandmark: (landmarkNote: ILandmark) => void;
  editLandmark: (landmarkNote: ILandmark) => void;
}

const initialValue = [
  {
    id: v4(),
    username: "Admin",
    note: "Botany Bay",
    lat: -34.032666736937855,
    lng: 151.1707612060547,
  },
  {
    id: v4(),
    username: "Admin",
    note: "Central Coach is popular with gorgeous beaches",
    lat: -33.59909945981394,
    lng: 151.28886423339844,
  },
  {
    id: v4(),
    username: "Jason",
    note: "Rivers near Sydney suburb areas",
    lat: -33.94229721751449,
    lng: 150.39709978834028,
  },
  {
    id: v4(),
    username: "Jason",
    note: "Canberra is the Capital of Australia",
    lat: -35.10987387616126,
    lng: 149.41382342115278,
  },
  {
    id: v4(),
    username: "Thomas",

    note: "Adelaide city is peacful and gorgous",
    lat: -34.451821623832856,
    lng: 138.48282681629127,
  },
  {
    id: v4(),
    username: "Thomas",

    note: "Lakes in Southern Australia ",
    lat: -31.8771489647849,
    lng: 136.41739712879127,
  },
];

export const LandmarksContext = createContext<ILandmarkContext>(
  {} as ILandmarkContext
);

export const LandmarksContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(LandmarksReducer, initialValue);

  const createLandmark = (landmarkNote: ILandmark) => {
    const newLandmarkNote = { ...landmarkNote, id: v4() };
    dispatch({
      type: "CREATE_LANDMARK",
      payload: newLandmarkNote,
    });
  };

  const editLandmark = (landmarkNote: ILandmark) => {
    dispatch({
      type: "EDIT_LANDMARK",
      payload: landmarkNote,
    });
  };

  return (
    <LandmarksContext.Provider
      value={{ landmarks: state, createLandmark, editLandmark }}
    >
      {children}
    </LandmarksContext.Provider>
  );
};
