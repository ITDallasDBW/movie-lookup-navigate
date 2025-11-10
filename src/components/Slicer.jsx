import React from 'react';

const Slicer = ({inFromAPI, onSlice}) => {
    React.useEffect(() => {
        if (inFromAPI?.length > 0) {
            const sliced = inFromAPI.slice(0, 6);
            onSlice(sliced);
        }
    }, [inFromAPI]); // Only run when inFromAPI changes

    return (
        <div>
            
        </div>
    );
}

export default Slicer;