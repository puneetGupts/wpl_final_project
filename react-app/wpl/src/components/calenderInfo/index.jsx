import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import {Link} from "react-router-dom";
import calendar from "../../images/calendar.png";
import teacher from "../../images/tutor.png";
import scheduler from "../scheduler/scheduler";
// import scheduler from "./components/scheduler/scheduler";
function CalendarInfo({tutor}) {
  // console.log(tutor);
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {

    const localStorage_tutor = JSON.parse(localStorage.getItem("cachedTutors"));
    console.log("Nirali>>localStorage_tutor"+localStorage_tutor);
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
    <div className={styles.calendar}>
      <Link to="/schedule"  className={styles.calendar_icon}>
        <img src={calendar} alt="bell icon" width={5} height={40} />
      </Link>

      {/* {isMenuOpen && (
        <div className={styles.calendar_info} ref={ref}>
          <div className={styles.menu_title}>
            <p>Upcoming Lessons</p>
            <Link to="/">
              <a>open calendar</a>
            </Link>
          </div>
          <div className={styles.lesson_info}>
            <h3 className={styles.lesson_date}>
              8
              <br />
              <small>Wed</small>
            </h3>
            <div className={styles.lesson}>
              <img
                src={teacher}
                className={styles.image}
                alt="arrow bottom"
                height={40}
                width={40}
              />
              <div className={styles.teacher_info}>
                <span>Tomas L</span>
                <p>5:00 PM - 5:30 PM</p>
              </div>
            </div>
          </div>
          <Link to="/">
            <a className={styles.schedule_btn}>+ Schedule A Lesson</a>
          </Link>
        </div>
      )} */}
    </div>
  );
}

export default CalendarInfo;
