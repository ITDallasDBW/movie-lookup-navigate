import React, { useState } from "react";

const ShowMovies = ({ moviesToShow = [], featureToLookup, countSoFar, changeCount }) => {
//   console.log(moviesToShow);
  function fetchFeature(imdbID) {
    featureToLookup(imdbID);
    console.log(imdbID);
  }

  return (
    <>
      <h3>ShowMovies</h3>
      <div className="buttons">
        <p>ShowMovies count =  {countSoFar}</p>
        <button className="backForth" onClick={() => changeCount(-1)}>
          Prev 6
        </button>
        <button className="backForth" onClick={() => changeCount(+1)}>
          Next 6
        </button>
      </div>
      <div className="movie">
        {moviesToShow.map((movie) => (
          // {moviesToShow.slice(0,6).map((movie) => (
          <div key={movie.imdbID} onClick={() => fetchFeature(movie.imdbID)}>
            <img className="listMovies" src={movie.Poster} alt="" />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowMovies;
