import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Scratch = () => {
  // useEffect(() => {
  //     setCall();
  // }, [])

  let [count, setCount] = useState(0);
//   let [callAgain, setCallAgain] = useState(false);

  let callAgain=false;
  let showing = (count + 1) * 6;
  let avail = 10;
  let diff = avail - showing;

  if (diff < 0) {
// setCallAgain(true);
    callAgain=true;
  } else {
// setCallAgain(false);
    callAgain=false;
  }

  if ((callAgain = true)) {
    avail = avail + 10;
  } 
//   else {
//     avail=avail;
//   }

  function nextSet() {
    console.log("Next");
    setCount(count + 1);
  }
  function prevSet() {
    console.log("Previous");
    setCount(count-1)
  }
  function reset() {}

  return (
    <>
      <Link to={"/"}>Home</Link>
      <div className="buttons">
        <button onClick={prevSet}>Previous 6</button>
        <button onClick={nextSet}>Next 6</button>
      </div>
      <div className="results">
        <div className="iteration">count: {count}</div>
        <div className="needed">showing: {showing}</div>
        <div className="available">avail: {avail}</div>
        <div className="difference">diff: {diff}</div>
        <div className="result">callAgain?: {callAgain = true ? "Yes" : "No"}</div>
      </div>
    </>
  );
};

export default Scratch;
