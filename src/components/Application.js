
import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview,getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {

  function bookInterview(id, interview) {
    console.log('bookInterview', id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
    .put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(()=>{
      setState({
        ...state,
        appointments
      })
    })
    }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
        .then(response => {
          setState({...state, appointments});
          return response
        })

        .catch(err => console.log (err))
  }
  
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersByDay = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersByDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  const setDay = day => setState({...state, day});
  const setDays = days => setState(prev => ({ ...prev, days }));
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
            <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"/>
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList
          days={state.days}
          day={state.day}
          onChange={setDay}
          
        /> 
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {schedule}
        {<Appointment key="last" time="5pm" bookInterview={bookInterview}/>}
      </section>
    </main>
  );
}
