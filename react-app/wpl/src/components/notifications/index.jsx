import React, { useState, useRef, useEffect } from "react";
import bell from "../../images/bell.png";
import tick from "../../images/tick.png";
import styles from "./style.module.scss";

function Notifications() {
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
    <div className={styles.notification}>
      <div onClick={() => setIsMenuOpen(true)} className={styles.bell}>
        <img src={bell} alt="bell icon" width={20} height={20} />
      </div>
      {isMenuOpen && (
        <div className={styles.notification_info} ref={ref}>
          <img src={tick} alt="tick icon" width={85} height={85} />
          <div className={styles.notification_text}>
            <span>You're all caught up!</span>
            <p>No new notifications</p>
          </div>
        </div>
      )}
    </div>  );
}

export default Notifications