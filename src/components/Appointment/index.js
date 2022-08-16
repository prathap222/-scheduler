import React, { Fragment } from 'react';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import 'components/Appointment/styles.scss';
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";



export default function Appointment(props) {

  const interview = props.interview;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // transition(SAVING);
    props.bookInterview(props.id,interview).then( () => {transition(SHOW)});

  }

  function destroy() {
    transition(DELETING);
    props.cancelInterview(props.id).then( () => {transition(EMPTY)})
    .catch( () => {
      transition(ERROR_DELETE, true)
    });
  }

  function confirm() {
    transition(CONFIRM);
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
        onDelete={confirm}
      />)}
      {mode === CREATE &&
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onCancel={back} onConfirm={destroy}/>}
    </article>);
}