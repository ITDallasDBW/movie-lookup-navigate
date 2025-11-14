import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFn from "../components/InputFn";
import axios from "axios";
import ShowMovies from "../components/ShowMovies";
import Sorting from "../components/Sorting";
// import ShowFeature from "../components/ShowFeature";
import Feature from "./Feature";

//API CREDS
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";

const Home = () => {
  //USE STATE
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [featureId, setFeatureId] = useState("");
  const [featureToShow, setFeatureToShow] = useState({});
  const [prevMovies, setPrevMovies] = useState([]);
  // const [apiResp, setApiResp] = useState([]);
  //PageUp/Dn states
  const [allMovies, setAllMovies] = useState([]);
  // const [displayCount, setDisplayCount]=useState(6);
  const [omdbPage, setOmdbPage] = useState(1);
  const [inputValue, setInputValue] = useState("");

  //USE EFFECT
  // Load ONCE on mount only
  useEffect(() => {
    const savedMovies = sessionStorage.getItem("sessionMovies");
    const savedInput = sessionStorage.getItem("sessionInput");
    const savedPage = sessionStorage.getItem("sessionPage");

    if (savedMovies) {
      setAllMovies(JSON.parse(savedMovies));
      setInputValue(savedInput || "");
      setOmdbPage(parseInt(savedPage) || 1);
    }
  }, []); // Empty array - ONLY runs on mount

  // //Only save on unmount
  // useEffect(() => {
  //   //Load on mount
  //   const savedMovies=sessionStorage.getItem("sessionMovies");
  //   if (savedMovies) {
  //     setAllMovies(JSON.parse(savedMovies));
  //     setInputValue(sessionStorage.getItem("sessionInput") || "");
  //     setOmdbPage(parseInt(sessionStorage.getItem("sessionPage")) || 1);
  //   }

  //   //Save on unmount (cleanup function)
  //   return () => {
  //     if (allMovies.length > 0) {
  //       sessionStorage.setItem("sessionMovies", JSON.stringify(allMovies));
  //       sessionStorage.setItem("sessionInput", inputValue);
  //       sessionStorage.setItem("sessionPage", omdbPage.toString());
  //     }
  //   }
  // }, [])

  // Save movies to session storage whenever they change
  // useEffect(() => {
  //   if (allMovies.length > 0) {
  //     sessionStorage.setItem("sessionMovies", JSON.stringify(allMovies));
  //   }
  // }, [allMovies]);

  // // Load saved movies when component mounts
  // useEffect(() => {
  //   const savedMovies = sessionStorage.getItem("sessionMovies");
  //   if (savedMovies) {
  //     setAllMovies(JSON.parse(savedMovies));
  //   }
  // }, []);

  // FUNCTIONS
  //get search term, setLoading, search for movie,
  //await response, set response to allMovies, stop loading

  console.log(`Before getMovies omdbPage ${omdbPage}`);
  async function getMovies(inputValue, pageNum) {
    setInputValue(inputValue);
    console.log(`inputValue set in getMovies fn: ${inputValue}`);
    // setLoading(true);
    // allMovies([]);
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${inputValue}&page=${pageNum}`
    );
    if (data.Response === "True" && data.Search) {
      if (pageNum === 1) {
        setAllMovies(data.Search); //First page - replace
      } else {
        setAllMovies((prev) => [...prev, ...data.Search]); //Add results to existing array
      }
      setOmdbPage(pageNum);
    }
    // setOmdbPage((prev) => prev + 1);
    // console.log(`omdbPage set at bottom of getMovies: ${omdbPage}`);

    // const searchResults = data.Search || [];
    // setMoviesToShow(searchResults);
    // setLoading(false);
    // console.log(searchResults);
  }
  //sends imdbID to address bar and redirects there
  function getFeatureId(featureId) {
    // console.log(featureId)
    sessionStorage.setItem("sessionMovies", JSON.stringify(allMovies));
    sessionStorage.setItem("sessionInput", inputValue);
    sessionStorage.setItem("sessionPage", omdbPage.toString());
    navigate(`${featureId}`);
  }
  //once data from API is sorted by select/sort box
  //sends sorted data (sorted) to be displayed
  const handleSort = (sorted) => {
    if (sorted) {
      setAllMovies(sorted);
    }
  };
  // console.log(prevList);
  function getFirstMovies(inputValue) {
    sessionStorage.clear();

    getMovies(inputValue, 1);
  }
  function getNext() {
    // const nextPage=omdbPage+1;
    // setOmdbPage(nextPage);
    getMovies(inputValue, omdbPage + 1);
    // console.log(omdbPage);
  }

  return (
    <>
      <hr />
      <h3>Home.js</h3>
      <section id="search">
        <button onClick={() => navigate("/feature")}>Feature</button>
        <hr />
        <InputFn onSubmit={getFirstMovies} />
      </section>
      <hr />
      <section id="display__movies">
        <Sorting moviesToSort={allMovies} onSort={handleSort} />
        <hr />
        <ShowMovies
          moviesToShow={allMovies}
          featureToLookup={(lookupId) => {
            getFeatureId(lookupId);
          }}
          // displayCount={displayCount}
          getMoreResults={getNext}
        />
      </section>
      <hr />
      <section id="display__feature"></section>
    </>
  );
};

export default Home;
