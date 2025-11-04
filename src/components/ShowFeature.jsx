import React from 'react';

const ShowFeature = ({ featureResults }) => {
    return (
        <div>
            <h2>{featureResults.Title}</h2>
            <img src={featureResults.Poster} alt={featureResults.Title} />
            <p>Year: {featureResults.Year}</p>
            <p>Plot: {featureResults.Plot}</p>
            <p>Director: {featureResults.Director}</p>
            <p>Actors: {featureResults.Actors}</p>
            <p>Rating: {featureResults.imdbRating}</p>
        </div>
    );
};

export default ShowFeature;