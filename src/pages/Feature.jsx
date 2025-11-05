import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import ShowFeature from "../components/ShowFeature";

//API CREDS
const BASE_URL = `https://www.omdbapi.com/`;
const API_KEY = "c393ced6";

const Feature = ({ getFeature }) => {
  let navigate = useNavigate();
  const {id} = useParams();
  const [featureResults, setFeatureResults] = useState({})
  const [loadFeature, setLoadFeature] = useState(false)

  useEffect(() => {
    setLoadFeature(true);
    getFeature(id)
  }, [])

  // console.log(id);
  // useEffect(() => {
  //   navigate(`${featureResults.imdbID}`)
  // }, [])
// console.log(featureResults)
  const handleGoBack = () => {
    navigate(-1);
  };

  //This gets the data for the feature 
  async function getFeature(id) {
    // setFeatureToShow({});
    const { data } = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&i=${id}`
    );

    const searchResults = data || {};
    setFeatureResults(searchResults);
    setLoadFeature(false);
    // console.log(data);
    // console.log(searchResults.Title)
    // console.log(featureToShow)
    // setLoading(false);
  }
  return (
    <>
      <h1>Feature.jsx</h1>
      <Link to={"/"}>Home</Link>
      <button onClick={handleGoBack}>Go Back</button>
      {/* <ShowFeature featureResults={featureResults} /> */}
      <h2>Show the Feature.jsx</h2>
      <h2>{featureResults.Title}</h2>
      <img src={featureResults.Poster} alt={featureResults.Title} />
      <p>Year: {featureResults.Year}</p>
      <p>Plot: {featureResults.Plot}</p>
      <p>Director: {featureResults.Director}</p>
      <p>Actors: {featureResults.Actors}</p>
      <p>Rating: {featureResults.imdbRating}</p>
    </>
  );
};

export default Feature;
