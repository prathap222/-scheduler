import React, { useState, useEffect } from "react";

export default function useVisualMode(initial){

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition(newMode, replace = false) {
    if (replace){
      return setMode(newMode);
    }
    setMode(newMode);
    setHistory((prev) => {
      return [...prev, newMode];
    });
  };

  function back() {
    if(history.length > 1) {
      setMode(history[history.length-2]);
      setHistory( (prev) => {
        console.log(prev.slice(0,-1));
        return prev.slice(0,-1);
      })

    } else {
      setMode(mode);
    }

  };

  return { mode, transition, back };
}