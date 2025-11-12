import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//API CREDS
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";

const Scratch = () => {
  let [count, setOmdbPage] = useState(1);
  let [avail, setAvail] = useState(10);
  const [inputValue, setInputValue] = useState(() => {
    return sessionStorage.getItem("inputValue") || "";
  });
  console.log(inputValue);

  async function getNext(inputValue) {
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${inputValue}&page={count+1}`
    );
    setOmdbPage(count + 1);
    const searchResults = data.Search || [];
    console.log(data.Search);
    //Direct results to Slicer
    // setRespToSlice(searchResults);
  }

  let showing = (count + 1) * 6;
  let diff = avail - showing;

  function nextSet() {
    console.log("Next");
    setOmdbPage(count + 1);
    // Check if we need more data after incrementing
    // let newShowing = (count + 2) * 6;
    // //THIS IS THE TEST FOR THE NEXT ITERATION
    // if (newShowing > avail) {
    //   //THIS IS WHERE THE NEXT CALL IS
    //   getNext(inputValue);
    //   setAvail(avail + 10);
    // }
  }
  function prevSet() {
    console.log("Previous");
    setOmdbPage(count - 1);
  }

  return (
    <>
      <Link to={"/"}>Home</Link>
      <div className="buttons">
        <button onClick={prevSet}>Previous 6</button>
        <button onClick={nextSet}>Next 6</button>
        {/* <button onClick={getNext}>Get Next</button> */}
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
