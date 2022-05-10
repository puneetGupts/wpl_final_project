import React, { useState, useRef, useEffect } from "react";
import arrow from "../../images/arrow-bottom.png";
import styles from "./style.module.scss"
import { NavLink, Link } from "react-router-dom";

function InfoPlan() {
    const ref = useRef();
    const [calculatedHours, setTotalHours] = useState(0);
    const [todayDate, setToday] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {

        async function getAppointments() {
            try{
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, '0');
              var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
              var yyyy = today.getFullYear();
              today = yyyy+'-'+mm+'-'+dd;
              setToday(mm+'-'+dd+'-'+yyyy);
              const localstorage_user = JSON.parse(localStorage.getItem("user"));
              const response = await fetch('http://localhost:3001/calculateTotalHours?day='+today+'&Id='+localstorage_user._id);
            const jsonData = await response.json();
              console.log('Nirali>>>> jsonData'+jsonData);
              setTotalHours(jsonData);
        
        
          } catch (error) {
        
              console.error(error.message);
        
          }
        }
      
      
              getAppointments();


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
        <div className={styles.student_plan_info}>
            <div className={styles.short_info}>
                <span className={styles.time_info}>{todayDate}</span>
                <span className={styles.lesson_minute_info}>{calculatedHours} Hours completed</span>
                <div className={styles.lesson_success_dot}>
                    <button className={styles.lesson_dot}></button>
                    <button className={styles.lesson_dot}></button>
                </div>
            </div>
            <div className={styles.arrow} onClick={() => setIsMenuOpen(true)}>
                <img src={arrow} alt="arrow bottom" height={8} width={10} />
            </div>

            {isMenuOpen && (
                <div className={styles.info_menu} ref={ref}>
                    <div className={styles.info_card}>
                        <span className={styles.card_title}>You completed total</span>
                        <h3 className={styles.left_minutes}>{calculatedHours} tutoring hours</h3>
                        <span className={styles.border}></span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InfoPlan;