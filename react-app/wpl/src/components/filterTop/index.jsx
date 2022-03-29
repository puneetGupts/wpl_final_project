import React from "react";
import { NavLink } from 'react-router-dom';
import classNames from "classnames";
// import styles from "../filterTop/styleIndex.scss"


function FilterTop({ handleKeyUp, status }) {
  return (
    <div className="filter_top">
      <div className="tutors_tab">
        <p>Find a Tutor</p>
        <div className="search_tutor_tab">
          <NavLink to="/studentHome">
          <a
              className={classNames({
                ["active"]: status === "homepage",
              })}
            >
              All
            </a>
          </NavLink>
          <NavLink to="/favorite">
          <a
              className={classNames({
                ["active"]: status === "favorite",
              })}
            >
              Favourite
            </a>
          </NavLink>          
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Tutor Name..."
        className="search"
        onKeyUp={(event) => handleKeyUp(event.target.value)}
      />
    </div>
  );
}

export default FilterTop;
