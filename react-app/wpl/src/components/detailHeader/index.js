import React from "react";
import styles from "./style.module.scss";
import CalenderInfo from "../calenderInfo";

function DetailHeader({ name, badge, location, avatar }) {
  return (
    <>
      <div className={styles.tutor_info}>
        <img className={styles.avatar} src={avatar} />
        <div className={styles.tutor_info_detail}>
          <h5>{name}</h5>
          <div className={styles.location}>
            <img className={styles.badge} src={badge} />
            <p>{location}</p>
          </div>
        </div>
        <div className={styles.calendar}>
          <CalenderInfo />
        </div>
      </div>
    </>
  );
}

export default DetailHeader;