import React, { useState } from "react";

const ShowMovies = ({ moviesToShow = [], featureToLookup }) => {
//   console.log(moviesToShow);



  const [endSlice, setEndSlice] = useState(6);
  let startSlice = endSlice - 6;
  function fetchFeature(imdbID) {
    featureToLookup(imdbID);
    // console.log(imdbID);
  }
//Click handlers
function pageDown() {
    console.log('Prev displayCount');
}
function pageUp() {
    console.log('Next displayCount');
}

  return (
    <>
      <h3>ShowMovies</h3>
      <button className="prevNext"  onClick={pageDown}>Prev</button>
      {/* disabled={endSlice<=6} */}
      <button className="prevNext" onClick={pageUp}>Next</button>
      <div className="movie">
        {moviesToShow.length > 0 &&
        (moviesToShow.slice(startSlice, endSlice).map((movie, index) => (
            <div key={movie.imdbID} onClick={() => fetchFeature(movie.imdbID)}>
              <div className="movie__elements">
                <h3>
                  {index} {movie.Title}
                </h3>
                <img className="poster" src={movie.Poster} alt="" />
                <p>{movie.Year}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ShowMovies;
