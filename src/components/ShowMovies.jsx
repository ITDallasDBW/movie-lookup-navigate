import React from "react";

const ShowMovies = ({ moviesToShow = [], featureToLookup }) => {
  console.log(moviesToShow);

  function fetchFeature(imdbID) {
    featureToLookup(imdbID);
    console.log(imdbID);
  }
  return (
    <>
      <h3>ShowMovies</h3>
      <div className="movie">
        {moviesToShow.slice(0, 6).map((movie) => (
          // <div key={movie.imdbID}>
          <div key={movie.imdbID} onClick={() => fetchFeature(movie.imdbID)}>
            <img src={movie.Poster} alt="" />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
        <button >Prev 6</button>
        <button>Next 6</button>
      </div>
    </>
  );
};

export default ShowMovies;
