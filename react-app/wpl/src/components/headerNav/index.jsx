import React, { useEffect } from "react";
import {NavLink} from "react-router-dom";
import styles from "./style.module.scss";
import CamblyConstants from "../../constant/camblyConstant";
import shortid from "shortid";

function headerNav() {
  return (
    <nav className={styles.navbar}>
      {CamblyConstants.HEADER.map((item) => (
        <NavLink to={item.slug} key={shortid.generate()}>
          <a>{item.value}</a>
        </NavLink>
      ))}
    </nav>
  );
}

export default headerNav;
