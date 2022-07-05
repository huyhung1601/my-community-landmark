import React from "react";
import { Nav } from "./nav/Nav";
import classes from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={classes.header}>
      <Nav />
    </header>
  );
};
