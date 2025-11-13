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
  const [displayCount, setDisplayCount]=useState(6);
  const [omdbPage, setOmdbPage]=useState(1);
  const [inputValue, setInputValue]=useState('');

  //USE EFFECT
    // Save movies to session storage whenever they change
  useEffect(() => {
    if (moviesToShow.length > 0) {
      sessionStorage.setItem("sessionMovies", JSON.stringify(moviesToShow));
    }
  }, [moviesToShow]);

  // Load saved movies when component mounts
  useEffect(() => {
    const savedMovies = sessionStorage.getItem("sessionMovies");
    if (savedMovies) {
      setMoviesToShow(JSON.parse(savedMovies));
    }
  }, []);

// FUNCTIONS
  //get search term, setLoading, search for movie,
  //await response, set response to moviesToShow, stop loading
  console.log(omdbPage);
  async function getMovies(inputValue) {
    // setLoading(true);
    // setMoviesToShow([]);
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${inputValue}&page=${omdbPage}`
    );
    if (omdbPage === 1) {
      setAllMovies(data.Search); //First page - replace
    } else {
      setAllMovies(prev => [...prev, ...data.Search]); //Add results to existing array
    }
    setOmdbPage(omdbPage+1);
      console.log(omdbPage);

    const searchResults = data.Search || [];
    setMoviesToShow(searchResults);
    // setLoading(false);
    // console.log(searchResults);
  }
//sends imdbID to address bar and redirects there
  function getFeatureId(featureId) {
    // console.log(featureId)
    navigate(`${featureId}`);
  }
//once data from API is sorted by select/sort box
//sends sorted data (sorted) to be displayed
  const handleSort = (sorted) => {
    if (sorted) {
      setMoviesToShow(sorted);
    }
  };
  // console.log(prevList);

  return (
    <>
    <hr />
      <h3>Home.js</h3>
      <section id="search">
        <button onClick={() => navigate("/feature")}>Feature</button>
        <hr />
        <InputFn onSubmit={getMovies} />
      </section>
      <hr />
      <section id="display__movies">
        <Sorting moviesToSort={moviesToShow} onSort={handleSort} />
        <hr />
        <ShowMovies
          moviesToShow={moviesToShow}
          featureToLookup={(lookupId) => {
            getFeatureId(lookupId);
          }}
        />
      </section>
      <hr />
      <section id="display__feature">
      </section>
    </>
  );
};

export default Home;
