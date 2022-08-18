import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);


  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  const updateSpots = function(id,days,value) {

      for(const dayId in days) {
        console.log("hi", days)
        if(days[dayId].appointments.includes(id)){
          days[dayId].spots += value;        
      }
    }
  }

  // Will allow us to change the local state when we book an interview
  function bookInterview(id, interview, mode) {
    if(!interview.interviewer){
      return Promise.reject("No interviewer was selected");
    }
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    if(mode !== "EDIT") {
      updateSpots(id,state.days,-1);
    }

    return axios.put(`/api/appointments/${id}`, {interview})
        .then(response => {
          setState({...state, appointments});
        });
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

    updateSpots(id,state.days,1);
    return axios.delete(`/api/appointments/${id}`)
        .then(response => {
          setState({...state, appointments});
        });
  }

  return {state, setDay, bookInterview, cancelInterview};
}