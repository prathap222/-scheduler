import React, { Fragment } from 'react';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import 'components/Appointment/styles.scss';
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";



export default function Appointment(props) {

  const interview = props.interview;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id,interview).then( () => {transition(SHOW)});

  }

  console.log("interview",props.interview);


  return (
    <article className="appointment" id={props.id}>
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />)}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={ () => { back() }} onSave={save}/>}
      {mode === SAVING && <Status message="Saving"/>}
    </article>
    );
} 