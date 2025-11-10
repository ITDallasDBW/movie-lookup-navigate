import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Scratch = () => {
  let [count, setCount] = useState(0);
  let [avail, setAvail] = useState(10);

  let showing = (count + 1) * 6;
  let diff = avail - showing;

  function nextSet() {
    console.log("Next");
    setCount(count + 1);
    // Check if we need more data after incrementing
    let newShowing = (count + 2) * 6;
    //THIS IS THE TEST FOR THE NEXT ITERATION
    if (newShowing > avail) {
      //THIS IS WHERE THE NEXT CALL IS
      setAvail(avail + 10);
    }
  }
  function prevSet() {
    console.log("Previous");
    setCount(count - 1);
  }

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
      </div>
    </>
  );
};

export default Scratch;
