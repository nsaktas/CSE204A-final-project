import React from 'react';

const WordDisplay = ({ words }) => {

    return (
        <div>
        <h2>Generated Word</h2>
        {words.length > 0 ? (
            <>
            <p>{words[0]}</p>
            </>
        ) : (
            <p>No word generated</p>
        )}
        </div>
    );
};

export default WordDisplay;
