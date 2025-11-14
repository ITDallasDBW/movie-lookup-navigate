import React, { useState } from "react";

const ShowMovies = ({ moviesToShow = [], featureToLookup, getMoreResults }) => {
    console.log(moviesToShow);

  const [displayCount, setDisplayCount] = useState(6);
  const [endSlice, setEndSlice] = useState(6);
  let startSlice = endSlice - 6;
  //passes selected movie to feature
  function fetchFeature(imdbID) {
    featureToLookup(imdbID);
    // console.log(imdbID);
  }

  //Click handlers
  function pageDown() {
    console.log("Prev displayCount");
  }
  function pageUp() {
    console.log("Next displayCount");
    const newDisplayCount = displayCount + 6;
    setEndSlice(endSlice + 6);
    //Check data supply for display
    if (newDisplayCount > moviesToShow.length) {
      getMoreResults();
    }
    setDisplayCount(newDisplayCount);
  }

  return (
    <>
      <h3>ShowMovies</h3>
      <p>Showing {startSlice} - {endSlice} of {moviesToShow.length}
</p>
      <button className="prevNext" onClick={pageDown}>
        Prev
      </button>
      {/* disabled={endSlice<=6} */}
      <button className="prevNext" onClick={pageUp}>
        Next
      </button>
      <div className="movie">
        {moviesToShow.length > 0 &&
          moviesToShow.slice(startSlice, endSlice).map((movie, index) => (
            <div key={movie.imdbID} onClick={() => fetchFeature(movie.imdbID)}>
              <div className="movie__elements">
                <h3>
                  {index}. {movie.Title}
                </h3>
                <img className="poster" src={movie.Poster} alt="" />
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ShowMovies;
