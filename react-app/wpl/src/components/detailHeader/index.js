import React from "react";
import styles from "./style.module.scss";
import CalenderInfo from "../calenderInfo";
import Ratings from "../ratings";
function DetailHeader({ name, badge, location, avatar, tutor }) {
  const localstorage_user = JSON.parse(localStorage.getItem("user"));
  console.log(localstorage_user);
  const istutor = localstorage_user.isTutor;
  return (
    <>
      <div className={styles.tutor_info}>
        <img className={styles.avatar} src={`../../${avatar}`} />
        <div className={styles.tutor_info_detail}>
          <h5>{name}</h5>
          <div className={styles.location}>
            <img className={styles.badge} src={badge} />
            <p>{location}</p>
          </div>
        </div>
        <Ratings value={tutor.rating} text={`${tutor.reviews} reviews`} />

        { !istutor?  (
                <div className={styles.calendar}>
                <CalenderInfo tutor={tutor}/>
              </div>
            ): < ></>} 
        
      </div>
    </>
  );
}

export default DetailHeader;
