import React from "react";
import 'components/InterviewerListItem.scss'
const classNames = require('classnames');

export default function InterviewerListItem(props) {
  let interviewerStyles = classNames("interviewer__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item": !props.selected
  })

  let imageStyles = classNames("interviewers__item-image",{
    "interviewers__item--selected-image": props.selected,
    "interviewers__item-image": !props.selected
    
  })

  return (
    <li
    className={interviewerStyles}
    onClick={()=>props.setInterviewer(props.name)}
    >
      <img
      className={imageStyles}
      src={props.avatar}
      alt={props.name}
      />
    </li>
  );
}
