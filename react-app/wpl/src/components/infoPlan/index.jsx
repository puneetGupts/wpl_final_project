import React, { useState, useRef, useEffect } from "react";
import arrow from "../../images/arrow-bottom.png";
import { NavLink } from "react-router-dom";

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
        <div className="student_plan_info">
            <div className="short_info">
                <span className="time_info">7:12 PM Dec 1</span>
                <span className="lesson_minute_info">30 Minutes</span>
                <div className="lesson_success_dot">
                    <button className="lesson_dot"></button>
                    <button className="lesson_dot"></button>
                </div>
            </div>
            <div className="arrow" onClick={() => setIsMenuOpen(true)}>
                <img src={arrow} alt="arrow bottom" height={8} width={10} />
            </div>

            {isMenuOpen && (
                <div className="info_menu" ref={ref}>
                    <div className="info_card">
                        <span className="card_title">Today's Minutes</span>
                        <h3 className="left_minutes">30 minutes left</h3>
                        <span className="border"></span>
                        <span className="status_text">
                            7 hours until daily reset at 3:00 AM +03
                        </span>
                        <span className="status_text">
                            Week resets Monday Dec 6, 2021 3:00 AM
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InfoPlan;