import React, { useState, useRef, useEffect } from "react";
import arrow from "../../images/arrow-bottom.png";
import styles from "./style.module.scss"
import { NavLink, Link } from "react-router-dom";

function InfoPlan() {
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
        <div className={styles.student_plan_info}>
            <div className={styles.short_info}>
                <span className={styles.time_info}>7:12 PM Dec 1</span>
                <span className={styles.lesson_minute_info}>30 Minutes</span>
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
                        <span className={styles.card_title}>Today's Minutes</span>
                        <h3 className={styles.left_minutes}>30 minutes left</h3>
                        <span className={styles.border}></span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InfoPlan;