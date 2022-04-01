import React, { useState, useRef, useEffect } from "react";
import bell from "../../images/bell.png";
import tick from "../../images/tick.png";

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
    <div className="notification">
      <div onClick={() => setIsMenuOpen(true)} className="bell">
        <img src={bell} alt="bell icon" width={20} height={20} />
      </div>
      {isMenuOpen && (
        <div className="notification_info" ref={ref}>
          <img src={tick} alt="tick icon" width={85} height={85} />
          <div className="notification_text">
            <span>You're all caught up!</span>
            <p>No new notifications</p>
          </div>
        </div>
      )}
    </div>  )
}

export default Notifications