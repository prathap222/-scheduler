import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import classNames from "classnames";

export default function InterviewerList(props) {
  let interviewerArray = [];
  return (
    <ul className="interviewers__list">
       {props.interviewers.map((interviewer)=> {
          return <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name} 
          avatar={interviewer.avatar}
          selected={interviewer.id === props.value}
          setInterviewer={() => props.onChange(interviewer.id)}
         />
       })}
    </ul>

  );
}