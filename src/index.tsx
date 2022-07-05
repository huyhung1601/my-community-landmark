import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import { LandmarksContextProvider } from "./context/landmarksContext/LandmarksContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LandmarksContextProvider>
      <App />
    </LandmarksContextProvider>
  </React.StrictMode>
);
