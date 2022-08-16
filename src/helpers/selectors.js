const matchIds = (appointments, ids) => {
  const matched = ids.map(id => appointments[id]);
  return matched;
}


function getAppointmentsForDay(state, day) {

  let appointmentArr = [];
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => appointmentArr.push(apptId))
    }
  })
  return matchIds(state.appointments, appointmentArr);
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
}

 function getInterviewersForDay(state, day) {

  let interviewersArr = [];
  let interviewersByDay = [];
  for(const stateDay of state.days) {
    if(stateDay.name === day){
      interviewersByDay = stateDay.interviewers;
    }
  }
   if(interviewersByDay) {
     for(const interviewId of interviewersByDay) {
      interviewersArr.push(state.interviewers[interviewId]);
     }
   }
   console.log("interview", interviewersArr);
  return interviewersArr;
} 

module.exports = {matchIds, getAppointmentsForDay, getInterview,getInterviewersForDay};