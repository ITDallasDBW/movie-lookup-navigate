import React, { useEffect, useState } from "react";

const ShowMovies = ({ moviesToShow = [], featureToLookup, getMoreResults }) => {
  console.log(moviesToShow);

  //   const [displayCount, setDisplayCount] = useState(6);
  const [endSlice, setEndSlice] = useState(6);
  const startSlice = Math.max(0, endSlice - 6);

  useEffect(() => {
    const savedSlice = sessionStorage.getItem("savedSlice");

    if (savedSlice) {
      setEndSlice(parseInt(savedSlice));
    }
  }, []);

  //passes selected movie to feature
  function fetchFeature(imdbID) {
    sessionStorage.setItem("savedSlice", endSlice.toString());
    featureToLookup(imdbID);
    // console.log(imdbID);
  }

  //Click handlers
  function pageDown() {
    const newEndSlice = endSlice - 6;
    setEndSlice(newEndSlice);
  }

  function pageUp() {
    const newEndSlice = endSlice + 6;
    setEndSlice(newEndSlice);
    //Check data supply for display
    if (newEndSlice > moviesToShow.length) {
      getMoreResults();
    }
  }

  return (
    <>
      <h3>ShowMovies</h3>
      <p>
        Showing {startSlice + 1} - {endSlice} of {moviesToShow.length}
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
