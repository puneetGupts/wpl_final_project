import React, { useState, useRef, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import bell from "../../images/bell.png";
import tick from "../../images/tick.png";
import styles from "./style.module.scss";

function Notifications() {

    const ref = useRef();
    const [appointments, setAppointments] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [fetchAppointment, setFetchAppointment] = useState(false);
    useEffect(() => {
     
    async function getAppointments() {
      try{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy+'-'+mm+'-'+dd;
        const userInfo=localStorage.getItem("user");
        const response = await fetch('http://localhost:3000/upcomingAppointments?day='+today+'&student_id='+userInfo);
      const jsonData = await response.json();
        console.log('jsonData'+(JSON.stringify(jsonData)));
        setAppointments(jsonData);
        console.log(appointments);
  
  
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
    }, [isMenuOpen, fetchAppointment]);
    
   
    function deleteAppointment(props) {

      console.log("delete function called" + props._id);
      try{
        
        var tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
      
        
        var slot = props.slot;
        var startHour;
          
          slot = slot.substring(0, slot.indexOf('to'));

          if(slot.includes('PM')) {
            slot = slot.substring(0, slot.indexOf(' '));
            startHour = Number(slot) + 12;
            
          } else {
            slot = slot.substring(0, slot.indexOf(' '));
            startHour = slot;
          }
          
          const selectedDate = props.date.slice(-2);
          console.log('tomorrow Date' +tomorrow.getDate());
            console.log('selectedDate Date' +selectedDate);
            console.log('startHour ' +startHour);
          const tomorrowHour = Number(tomorrow.getHours())+1;
          console.log('tomorrow.getHours()' +tomorrowHour);
          if((tomorrow.getDate() === selectedDate && startHour >= tomorrowHour) ||(selectedDate > tomorrow.getDate() )) {
            
            const res = fetch('http://localhost:3000/appointments/'+props._id, { method: 'DELETE' });
              if(res.status == 'ok')
                alert('your appointment has been deleted successfully');
                setFetchAppointment(true);
            
          } else {
            alert('You can only delete the appointment before 24 hours');
          }

      


       
  
    } catch (error) {
  
        console.error(error.message);
  
    }
    } 
    
  return (
    <div className={styles.notification}>
      <div onClick={() =>  setIsMenuOpen(true)} className={styles.bell}>
        <img src={bell} alt="bell icon" width={20} height={20} />
      </div>
      {isMenuOpen && (
        <div className={styles.notification_info} ref={ref}>
          <div>
        <h1>Upcoming Appointments</h1>
        { appointments.map( (appointment,id) => (
          <div className="card" key={ id }>
  <div className="card-body">
    <h5 className="card-title">{ appointment.title }</h5>
    <h6 className="card-subtitle mb-2 text-muted">{ appointment.date } </h6>
    <p className="card-text">{ appointment.slot } </p>
    <i key = {appointment._id}>
    <button name ="delete" onClick={()=>{deleteAppointment(appointment)}}/>
    </i>
  </div>
  </div>
))}

       

        </div>
        </div>
      )}
    </div>  );
}

export default Notifications