import React from 'react';
import DayListItem from 'components/DayListItem';


// DayList renders a list of DayListItem components
export default function DayList(props) {
  const schedule = props.days.map(dayObj => {  
    return (
      <DayListItem
        key={dayObj.id}
        name={dayObj.name}
        spots={dayObj.spots}
        selected={dayObj.name === props.day}
        setDay={props.setDay} />         
    )
  })
  return <ul>{schedule}</ul>
}
