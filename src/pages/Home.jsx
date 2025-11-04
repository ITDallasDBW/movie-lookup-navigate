import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFn from "../components/InputFn";
import axios from "axios";
import ShowMovies from "../components/ShowMovies";
import Sorting from "../components/Sorting";
import ShowFeature from "../components/ShowFeature";

//API CREDS
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";

const Home = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiResp, setApiResp] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [featureToGet, setFeatureToGet] = useState("");
  const [featureToShow, setFeatureToShow] = useState({})
  //   const [dataToShow, setDataToShow] = useState([]);

  //get search term, setLoading, search for movie,
  //await response, set response to moviesToShow, stop loading
  async function getMovies(inputValue) {
    setLoading(true);
    setApiResp([]);
    setMoviesToShow([]);
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${inputValue}`
    );

    const searchResults = data.Search || [];
    setApiResp(searchResults);
    setMoviesToShow(searchResults);
    setLoading(false);
    console.log(searchResults);
  }
  async function getFeature(featureToGet) {
    setLoading(true);
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&i=${featureToGet}`
    );

    const featureResults = data;
    setFeatureToShow(featureResults);
    navigate(`${featureToGet}`);
    console.log(data);
  }

  const handleSort = (sorted) => {
    setMoviesToShow(sorted);
  };
  return (
    <>
      <h1>Home.js</h1>
      <section id="search">
        <button onClick={() => navigate("/feature")}>Feature</button>
        <InputFn onSubmit={getMovies} />
      </section>
      <section id="display__movies">
        <Sorting moviesToSort={apiResp} onSort={handleSort} />
        <ShowMovies
          moviesToShow={moviesToShow}
          featureToLookup={(id) => {
            setFeatureToGet(id);
            getFeature(id);
          }}
        />
        {featureToShow && Object.keys(featureToShow).length > 0 && (
          <ShowFeature featureResults={featureToShow} />
        )}
      </section>
    </>
  );
};

export default Home;
