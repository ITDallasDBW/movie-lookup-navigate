import React, { useState } from "react";

const ShowMovies = ({
  moviesToShow = [],
  featureToLookup,
  countSoFar,
  pageUp,
  pageDown,
  allMovies
}) => {
  //   console.log(moviesToShow);
  function fetchFeature(imdbID) {
    featureToLookup(imdbID);
    // console.log(imdbID);
  }

  return (
    <>
      <hr />
      <h3>ShowMovies</h3>
      <div className="buttons">
        <p>ShowMovies OMDB page count = {countSoFar}</p>
        <button className="backForth" onClick={() => pageDown()}>
          Prev 6
        </button>
        <button className="backForth" onClick={() => pageUp()}>
          Next 6
        </button>
      </div>
      <div className="movie">
        {moviesToShow.map((movie, index) => (
          // {moviesToShow.slice(0,6).map((movie) => (
          <div key={movie.imdbID} onClick={() => fetchFeature(movie.imdbID)}>
            <h3>{allMovies.length} {movie.Title}</h3>
            <img className="listMovies" src={movie.Poster} alt="" />
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowMovies;
