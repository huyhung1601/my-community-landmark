import { ILandmark } from "./LandmarksContext";

const LandmarksReducer = (state: ILandmark[], action: any) => {
  switch (action.type) {
    case "CREATE_LANDMARK":
      return [...state, action.payload];
    case "EDIT_LANDMARK":
      return state.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
    default:
      return state;
  }
};

export default LandmarksReducer;
