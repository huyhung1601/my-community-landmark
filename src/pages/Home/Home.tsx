import React from "react";
import { Header, Map } from "../../components";
import classes from "./Home.module.scss";

export const Home = () => {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.mapContainer}>
        <Map />
      </div>
    </div>
  );
};
