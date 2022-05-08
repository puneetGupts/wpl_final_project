import React, { useState, useEffect } from "react";


function TutorUpcomingAppointment () {
  
    const [appointments, setAppointments] = useState([]);


    useEffect(() => {
     
    async function getAppointments() {
      try{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy+'-'+mm+'-'+dd;
        const localstorage_user = JSON.parse(localStorage.getItem("user"));
        console.log(localstorage_user);
        const tutorId = localstorage_user.tutorId;
        
      const response = await fetch('http://localhost:3001/tutorUpcomingAppointments?day='+today+'&tutorId='+tutorId);
      const jsonData = await response.json();
        console.log('jsonData'+(JSON.stringify(jsonData)));
        setAppointments(jsonData);
        console.log(appointments);
  
  
    } catch (error) {
  
        console.error(error.message);
  
    }
  }


        getAppointments();
      
    }, [ ]);
    
   
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
            
            const res = fetch('http://localhost:3001/appointments/'+props._id, { method: 'DELETE' });
            alert('deleted Record:'+props._id);
              if(res.status == 'ok')
                alert('your appointment has been deleted successfully');
                window.location.reload();
            
          } else {
            alert('You can only delete the appointment before 24 hours');
          }

      


       
  
    } catch (error) {
  
        console.error(error.message);
  
    }
    } 
    return (
        <div>
        <h1>Upcoming Appointments With Students</h1>
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
    
      );

}


export default TutorUpcomingAppointment;

