import React from 'react';


const ShowMovies = ({moviesToShow = [], featureToLookup}) => {
    console.log(moviesToShow)

    function fetchFeature(imdbID) {
        featureToLookup(imdbID);
        console.log(imdbID);
    }
    return (
        <>
            <h3>ShowMovies</h3>
            <div className="movie">
                {moviesToShow.length > 0 ? (
                    moviesToShow.map((movie) => (
                        // <div key={movie.imdbID}>
                         <div key={movie.imdbID} onClick={() =>  
                        fetchFeature(movie.imdbID)
                        }>
                           
                            <img src={movie.Poster} alt="" />
                            <h3>{movie.Title}</h3>
                            <p>{movie.Year}</p>
                        </div>
                    ))
                ) : (
                    <h3>Loading</h3>
                )}
            </div>

        </>
    );
}

export default ShowMovies;


