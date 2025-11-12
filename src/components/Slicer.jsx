import React, { useState } from 'react';

const Slicer = ({inFromAPI, onSlice, endSlice}) => {
let startSlice=(endSlice-6);


    React.useEffect(() => {
        if (inFromAPI?.length > 0) {
            const sliced = inFromAPI.slice(startSlice, endSlice);
            console.log(startSlice, endSlice);
            onSlice(sliced);
        }
    }, [inFromAPI]); // Only run when inFromAPI changes

    return (
        <>
            
        </>
    );
}

export default Slicer;