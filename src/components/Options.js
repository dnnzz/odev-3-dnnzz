import React from "react";
import { onVote } from "../utils/socket";

export default function Options() {
  const handleClick = (value) => {
    onVote("new-vote", value);
  };
  return (
    <div className='options-container'>
      <div onClick={(e) => handleClick("javascript")} className='javascript'>
        <h2>Javascript</h2>
      </div>
      <div onClick={(e) => handleClick("go")} className='go'>
        <h2>Go</h2>
      </div>
      <div onClick={(e) => handleClick("ruby")} className='ruby'>
        <h2>Ruby</h2>
      </div>
      <div onClick={(e) => handleClick("cplus")} className='cplus'>
        <h2>C++</h2>
      </div>
    </div>
  );
}
