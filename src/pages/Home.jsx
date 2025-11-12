import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFn from "../components/InputFn";
import axios from "axios";
import ShowMovies from "../components/ShowMovies";
import Sorting from "../components/Sorting";
import Feature from "./Feature";
import Slicer from "../components/Slicer";
import PageNextLast from "../components/PageNextLast";

//API CREDS
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";

const Home = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [respToSlice, setRespToSlice] = useState([]);
  const [nextResp, setNextResp] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [nextMovies, setNextMovies] = useState([]);
  const [featureId, setFeatureId] = useState("");
  const [featureToShow, setFeatureToShow] = useState({});
  const [prevMovies, setPrevMovies] = useState([]);
  // const [apiResp, setApiResp] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);
  const [omdbPage, setOmdbPage] = useState(1);

  console.log(`31: displayCount: ${displayCount}`);
  console.log(`32: omdbPage: ${omdbPage}`);
  // const [omdbPage, setOmdbPage] = useState(() => {
  //   const saved = sessionStorage.getItem("omdbPage");
  //   return saved ? Number(saved) : 1;
  // });

  // Session Storage saves omdbPage when it changes.

  //Session Storage saves movies between pages

  // Load saved vars when component mounts

  //get search term, setLoading, search for movie,
  //await response, set response to moviesToShow, stop loading
  async function getMovies(inputValue, omdbPage) {
    setLoading(true);
    setInputValue(inputValue);
    // sessionStorage.setItem("inputValue", inputValue);
    // setMoviesToShow([]);
    // console.log(omdbPage);
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${inputValue}&page=${omdbPage}`
    );
    const searchResults = data.Search || [];
    if (omdbPage === 1) {
      setAllMovies(data.Search); //Make sure list is current
    } else {
      setAllMovies((prev) => [...prev, ...data.Search]); //Add new response to existing
    }
    setOmdbPage(omdbPage);

    //Direct results to Slicer
    setRespToSlice(searchResults);
    setLoading(false);
  }

  //Sort
  function handleSort(sorted) {
    if (sorted) {
      setMoviesToShow(sorted);
    }
  }
  //Open new page w/imdbID in url for Feature
  function getFeatureId(featureId) {
    navigate(`${featureId}`);
  }
  //Handling results page +/-
  // function handlePages(amount) {
  //   setOmdbPage((prev) => prev + amount);
  //   console.log(`Page ${omdbPage + amount}`);
  // }

  function showNext6() {
    console.log("Page up. Show next 6.");
    const newDisplayCount = displayCount + 6;
    //Does display need exceed supply data?
    if (newDisplayCount > allMovies.length) {
      getMovies(inputValue, omdbPage + 1); //Call API for 10 more records
    } else {
      console.log("No API call needed");
      console.log(displayCount);
      //send allMovies to Slicer with displayCount as endSlice
      setRespToSlice(allMovies);
    }
    setDisplayCount(newDisplayCount);
    setOmdbPage((prev) => prev + 1);
  }
  function showPrev6() {
    console.log("Page down. Show prev 6.");
    setDisplayCount((prev) => Math.max(6, prev - 6));
    console.log(displayCount);
    //send allMovies to Slicer with displayCount as endSlice
    setRespToSlice(allMovies);
  }

  //Slice
  function handleSlice(slicing) {
    setMoviesToShow(slicing);
  }

  return (
    <>
      <hr />
      <h3>Home.js</h3>
      <section id="search">
        <p>Home OMDB page count = {omdbPage}</p>
        <p>Home displayCount = {displayCount}</p>
        <button onClick={() => navigate("/scratch")}>Scratch</button>
        <InputFn onSubmit={(term) => getMovies(term, 1)} />
      </section>

      {/* <PageNextLast countSoFar={count} changeCount={handlePages} /> */}
      <Slicer
        inFromAPI={respToSlice}
        onSlice={handleSlice}
        endSlice={displayCount}
      />
      {/* SLICER HERE */}
      {loading && <h1>MAKING LOAD</h1>}

      {/* <p>savedCount = {savedCount}</p> */}
      {moviesToShow.length > 0 && (
        <section id="display__movies">
          <Sorting moviesToSort={moviesToShow} onSort={handleSort} />
          <ShowMovies
            moviesToShow={moviesToShow}
            countSoFar={omdbPage}
            pageUp={showNext6}
            pageDown={showPrev6}
            allMovies={allMovies}
            featureToLookup={(lookupId) => {
              getFeatureId(lookupId);
              // console.log(lookupId);
            }}
          />
        </section>
      )}
    </>
  );
};

export default Home;
