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
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [featureId, setFeatureId] = useState("");
  const [featureToShow, setFeatureToShow] = useState({});
  const [prevMovies, setPrevMovies] = useState([]);
  // const [apiResp, setApiResp] = useState([]);

  useEffect(() => {
    // Save movies to session storage whenever they change
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

  //get search term, setLoading, search for movie,
  //await response, set response to moviesToShow, stop loading
  async function getMovies(inputValue) {
    setLoading(true);
    setMoviesToShow([]);
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${inputValue}`
    );
    const searchResults = data.Search || [];
    setMoviesToShow(searchResults);
    setLoading(false);

    // console.log(searchResults);
  }

  function getFeatureId(featureId) {
    // console.log(featureId)
    navigate(`${featureId}`);
  }

  const handleSort = (sorted) => {
    if (sorted) {
      setMoviesToShow(sorted);
    }
  };
  // console.log(prevList);
  return (
    <>
      <h1>Home.js</h1>
      <section id="search">
        <button onClick={() => navigate("/scratch")}>Scratch</button>
        <InputFn onSubmit={getMovies} />
      </section>
        {loading && <h1>MAKING LOAD</h1>}
        {moviesToShow.length > 0 &&
      <section id="display__movies">
        <Sorting moviesToSort={moviesToShow} onSort={handleSort} />
        <ShowMovies
          moviesToShow={moviesToShow}
          featureToLookup={(lookupId) => {
            getFeatureId(lookupId);
            // console.log(lookupId);
          }}
          />
      </section>
        }
    </>
  );
};

export default Home;
