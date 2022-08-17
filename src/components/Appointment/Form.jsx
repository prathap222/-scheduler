import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import { action } from '@storybook/addon-actions/dist/preview';

export default function Form(props) {
  //For keeping track of the name
  const [currentName, setName] = useState(props.name || "");
  const [currentInterviewer, setInterviewer] = useState(props.value || null);
  const [error, setError] = useState("");


  //Helper function to clear all fields
  const reset = () => {
    setName("")
    setInterviewer('null')
    setError(null);
  }

  function cancel () {
    // props.onCancel;
    reset();
    props.onCancel()
  };

  function validate() {
    if (currentName === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (currentInterviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");

    props.onSave(currentName, currentInterviewer);
  }

  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name" 
            value={currentName}       
            onChange={(event) => {setName(event.target.value)}}            
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={currentInterviewer} 
          onChange={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => {validate();}}>Save</Button>
        </section>
      </section>
    </main>
  );
}