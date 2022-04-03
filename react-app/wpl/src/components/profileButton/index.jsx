import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import {NavLink} from "react-router-dom";
// import avatar from "../../src/assets/img/avatar.png";
import avatar from "../../images/avatar.png";

function CalendarInfo() {
  const ref = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);
  return (
    <div className={styles.profile}>
      <img
        src={avatar}
        alt="profile avatar"
        width={40}
        height={40}
        onClick={() => setIsMenuOpen(true)}
      />
      {isMenuOpen && (
        <nav className={styles.settings_menu} ref={ref}>
          <NavLink to="/">
            <a className={styles.menu_item}> Account Settings </a>
          </NavLink>
          <NavLink to="/">
            <a className={styles.menu_item}> Messages </a>
          </NavLink>
          <NavLink to="/">
            <a className={styles.menu_item}> Calendar </a>
          </NavLink>
          <NavLink to="/">
            <a className={styles.menu_item}> Sign Out </a>
          </NavLink>
        </nav>
      )}
    </div>
  );
}

export default CalendarInfo;
