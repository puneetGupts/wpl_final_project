/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-restricted-globals */
import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import Modal from "react-bootstrap/Modal";
import styles from './style.module.scss';

export default class Scheduler extends React.Component {
  
  state = {
    weekendsVisible: true,
    currentEvents: [],
    show : false,
    selectInfo:[],
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
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
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
        <div class="form-group">
          <label for="exampleInputEmail1">Meeting Detail</label>
          <input type="text" class="form-control" placeholder="Meeting Detail" id="meetingDetail"/>
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

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }
  handleSelectDate = () => {
    let title =document.getElementById("meetingDetail").value ;
    this.setState({
      show: false
    });
    let calendarApi = this.state.selectInfo.view.calendar;
    console.log(this.state.selectInfo);
    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: this.state.selectInfo.startStr,
        end: this.state.selectInfo.endStr,
        allDay: this.state.selectInfo.allDay
      })
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
