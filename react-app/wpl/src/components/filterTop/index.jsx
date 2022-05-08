import React from "react";
import { NavLink ,Link,useLocation} from 'react-router-dom';
import classNames from "classnames";
import styles from "./style.module.scss"


function FilterTop({handleKeyUp, status}) {
    return (
    <div className={styles.filter_top}>
      <div className={styles.tutors_tab}>
        <p>Find a Tutor</p>
        <div className={styles.search_tutor_tab}>
          <Link to="/studentHome">
          <a
              className={classNames({
                ["active"]: status === "homepage",
              })}
            >
              All
            </a>
          </Link>
          <Link to="/favorite">
          <a
              className={classNames({
                ["active"]: status === "favorite",
              })}
            >
              Favourite
            </a>
          </Link>          
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Tutor Name..."
        className={styles.search}
        onKeyUp={(event) => handleKeyUp(event.target.value)}
      />
    </div>
  );
}

export default FilterTop;
