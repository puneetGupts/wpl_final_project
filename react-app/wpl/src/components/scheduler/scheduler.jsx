/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-restricted-globals */
import React, {Component} from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import Modal from "react-bootstrap/Modal";
import styles from './style.module.scss';
import { useParams } from 'react-router-dom'
// import { TimePicker } from 'antd';



export default class Scheduler extends Component {
 
  state = {
    weekendsVisible: true,
    currentEvents: [],
    show : false,
    showAvailableTime : false,
    availability: [],
    selectedTime: '',
    selectInfo:[],
    time: '10:00 AM',
    DBEvents:[],
    
  }
  componentDidMount = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    console.log("id "+id);
    console.log("component did mount");
    const response = fetch('http://localhost:3001/appointments')
    .then( response => response.json())
    .then((data) => {
      this.setState({DBEvents : data});
      console.log(this.state.DBEvents);
      console.log('Initial Events' + INITIAL_EVENTS)
    })
    .catch(console.log);
  }




  calendarValue = (events) => {
    const response = fetch('event_util.json')
    .then( response => response.json())
    .then((data) => {
      this.setState({DBEvents : data});
      console.log(this.state.DBEvents);
      console.log('Initial Events' + INITIAL_EVENTS.json())
    })
    .catch(console.log);
    return this.state.DBEvents;
   }
 
  render() {
    

    return (
      <div className='styles.demo-app'>
        <div className='styles.demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            
            initialEvents={ INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>


        <Modal show={this.state.show} onHide={this.handleClose} animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>Schedule Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
          <label>Meeting Detail</label>
          <input type="text" className="form-control" placeholder="Meeting Detail" id="meetingDetail" onChange={this.handlechange}/>
          <div>
          <button className="link" onClick ={this.showAvailableTime}>Show available times</button>

          </div>
          <div style={{display: "none"}} id="welcomeDiv" >
              <a id = "8 AM to 9 AM"> <input id="male" type="radio" value="8 AM to 9 AM" name="time" /> <label>8 AM to 9 AM</label><br/></a>
              <a id = "9 AM to 10 AM"> <input id="male" type="radio" value="9 AM to 10 AM" name="time" /> <label>9 AM to 10 AM</label><br/></a>
              <a id = "10 AM to 11 AM"> <input id="male" type="radio" value="10 AM to 11 AM" name="time" /> <label>10 AM to 11 AM</label><br/></a>
              <a id = "11 AM to 12 AM"> <input id="male" type="radio" value="11 AM to 12 PM" name="time" /> <label>11 AM to 12 PM</label><br/></a>
              <a id = "1 PM to 2 PM"> <input id="male" type="radio" value="1 PM to 2 PM" name="time" /> <label>1 PM to 2 PM</label><br/></a>
              <a id = "2 PM to 3 PM"> <input id="male" type="radio" value="2 PM to 3 PM" name="time" /> <label>2 PM to 3 PM</label><br/></a>
              <a id = "3 PM to 4 PM"> <input id="male" type="radio" value="3 PM to 4 PM" name="time" /> <label>3 PM to 4 PM</label><br/></a>
              <a id = "4 PM to 5 PM"> <input id="male" type="radio" value="4 PM to 5 PM" name="time" /> <label>4 PM to 5 PM</label><br/></a>

              
          </div>

        </div>



        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={this.handleSelectDate}>
            Confirm
          </button>
          <button variant="primary" onClick={this.handleClose}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
        


      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='styles.demo-app-sidebar'>
        
        <div className='styles.demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>

        
      </div>
    )
  }
  showAvailableTime = async() =>{
    console.log("function called");
    console.log("selected Time" + this.state.selectInfo.startStr);

      try {
          const response = await fetch(`http://localhost:3001/appointments/?day=${this.state.selectInfo.startStr}`);
          const jsonData = await response.json();
          console.log(jsonData.length);
          for(var i = 0; i < jsonData.length; i++){
              
             document.getElementById(jsonData[i].slot).style.display = "none";
          }

  
      } catch (error) {
  
          console.error(error.message);
  
      }
      document.getElementById('welcomeDiv').style.display = "block";

  }
  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }
  handleTimeSelection = (time) => {
    this.setState({
      time: time,
    })
  }
  handleSelectDate = () => {
    let timeSlot = "";
    let times = document.getElementsByName('time');
    times.forEach((time) => {
                if (time.checked) {
                  timeSlot = time.value;
                }
            });
    this.setState({
      show: false
    });
    let calendarApi = this.state.selectInfo.view.calendar;
    console.log(this.state.selectInfo);
    calendarApi.unselect() // clear date selection
    console.log(timeSlot);

    let title = document.getElementById("meetingDetail").value + timeSlot;
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: this.state.selectInfo.startStr,
        end: this.state.selectInfo.endStr,
        allDay: this.state.selectInfo.allDay
      })
    }

    try {
      console.log('nirali>>tutorId'+JSON.stringify(this.props));
      const localstorage_user = JSON.parse(localStorage.getItem("user"));
      console.log(localstorage_user);
      //const tutorId = localstorage_user.tutorId;
        fetch(`http://localhost:3001/appointments`, {
        method:  'POST',
        body: JSON.stringify({
            title: document.getElementById("meetingDetail").value,
            slot: timeSlot,
            date: this.state.selectInfo.startStr,
            studentId : localstorage_user._id,
            tutorId: "123"

        }), 
        headers: {
          "Content-type" : "application/json"
        }
      });

  } catch (error) {

      console.error(error.message);

  }
   
  }

  handleDateSelect = (selectInfo) => {

    this.setState({
      show: true,
      selectInfo: selectInfo,
    })
  }
  
  handleClose = () =>{
    this.setState({
      show: false
    })
  }

  handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  console.log('show event'+eventInfo.event.title);
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
