import React from "react";
import { Logo } from "../../../UI";

import classes from "./Nav.module.scss";

export const Nav = () => {
  return (
    <nav className={classes.nav}>
      <Logo />
    </nav>
  );
};
