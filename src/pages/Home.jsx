import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFn from "../components/InputFn";
import axios from "axios";
import ShowMovies from "../components/ShowMovies";
import Sorting from "../components/Sorting";
// import ShowFeature from "../components/ShowFeature";
import Feature from "./Feature";
import Slicer from "../components/Slicer";

//API CREDS
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";

const Home = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [respToSlice, setRespToSlice] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [featureId, setFeatureId] = useState("");
  const [featureToShow, setFeatureToShow] = useState({});
  const [prevMovies, setPrevMovies] = useState([]);
  // const [apiResp, setApiResp] = useState([]);
  const [count, setCount] = useState(0);

  //Session Storage saves movies between pages
  useEffect(() => {
    // Save vars to session storage whenever they change
    if (moviesToShow.length > 0) {
      sessionStorage.setItem("sessionMovies", JSON.stringify(moviesToShow));
      console.log(moviesToShow)
    }
  }, [moviesToShow]);
  
  // Load saved vars when component mounts
  useEffect(() => {
    const savedMovies = sessionStorage.getItem("sessionMovies");
    if (savedMovies) {
      console.log(savedMovies);
      setMoviesToShow(JSON.parse(savedMovies));
    }
  }, []);



  //get search term, setLoading, search for movie,
  //await response, set response to moviesToShow, stop loading
  async function getMovies(inputValue) {
    setLoading(true);
    setMoviesToShow([]);
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${inputValue}`
    );
    const searchResults = data.Search || [];
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
  //Navigating search results pages
  function handlePages(amount) {
    setCount((prev) => prev + amount);
    console.log(`Page ${count + amount}`);
  }
  //Slice
  function handleSlice(slicing) {
    setMoviesToShow(slicing);
  }
  //Open new page w/imdbID in url for Feature
  function getFeatureId(featureId) {
    navigate(`${featureId}`);
  }
  

  return (
    <>
      <h3>Home.js</h3>
      <section id="search">
        <button onClick={() => navigate("/scratch")}>Scratch</button>
        <InputFn onSubmit={getMovies} />
      </section>

      
      <Slicer inFromAPI={respToSlice} onSlice={handleSlice} />
      {/* SLICER HERE */}
      {loading && <h1>MAKING LOAD</h1>}
      <p>Home count = {count}</p>

          

      {/* <p>savedCount = {savedCount}</p> */}
      {moviesToShow.length > 0 && (
        <section id="display__movies">
          <Sorting moviesToSort={moviesToShow} onSort={handleSort} />
          <ShowMovies
            moviesToShow={moviesToShow}
            countSoFar={count}
            // countUp={() => setCount(count + 1)}
            // countDown={() => setCount(count - 1)}
            changeCount={handlePages}
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
