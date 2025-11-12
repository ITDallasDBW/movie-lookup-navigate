import axios from "axios";
import React, { useState } from "react";

//API CREDS
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";

const PageNextLast = ({ countSoFar, changeCount }) => {
  const [inputValue, setInputValue] = useState(() => {
    return sessionStorage.getItem("inputValue") || "";
  });
  console.log(inputValue);

  //async API call to get more results
  async function getNextPage(inputValue) {
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${inputValue}&page={count+1}`
    );
    //nextResp is newAvail
    const nextResp = data.Search || [];
    console.log(data.Search);
    //Direct results to Slicer
    // setRespToSlice(searchResults);
  }

  let showing = countSoFar * 6;
  let startSlice = showing - 6;
  let avail = 10;
  let nextShow = showing + 6;
  let callForNext = (nextShow > avail);
  if (callForNext) {
    avail=avail+10;
  }
  let diff = avail - showing;


  return (
    <>
      <hr />
      <h3>PageNextLast</h3>
      <p>Iteration: {countSoFar}</p>
      <p>slice({startSlice}, {showing})</p>
      <p>Showing: {showing}</p>
      <p>Available: {avail}</p>
      <p>Call API before next iteration: {callForNext ? 'true' : 'false'}</p>
      <div className="buttons">
        <button
          className="backForth"
          onClick={() => changeCount(-1)}
          disabled={countSoFar === 1}
        >
          Prev 6
        </button>
        <button className="backForth" onClick={() => changeCount(+1)}>
          Next 6
        </button>
      </div>
      <p>PNL count = {countSoFar}</p>
    </>
  );
};

export default PageNextLast;
