import React, { useState } from 'react';

const WordFilter = ({ onGenerate, onWordLengthChange, onFirstLetterChange, onAttemptsChange }) => {
const [attempts, setAttempts] = useState('');

const handleAttemptsChange = event => {
    const newAttempts = parseInt(event.target.value);
    onAttemptsChange(newAttempts);
};

const handleGenerateClick = () => {
    onGenerate();
};

const handleWordLengthChange = event => {
    const newLength = parseInt(event.target.value);
    onWordLengthChange(newLength);
};

const handleFirstLetterChange = event => {
    const newLetter = event.target.value;
    onFirstLetterChange(newLetter);
};

return (
    <div className="filtersContainer">
    <h2>Word Filters</h2>
    <div className='filterInputContainer'>
    <label htmlFor="wordLength">Word Length:</label>
    <input
    type="number"
    id="wordLength"
    maxLength="1"
    min='3'
    max='5'
    onChange={handleWordLengthChange}
    />
    </div>


    <div className='filterInputContainer'>
    <label htmlFor="firstLetter">First Letter:</label>
    <input
        type="text"
        id="firstLetter"
        maxLength="1"
        onChange={handleFirstLetterChange}
    /> 
    </div>


    <div className='filterInputContainer'>
    <label htmlFor="attempts">Number of Attempts:</label>
    <input
        type="number"
        id="attempts"
        min="1"
        max='10'
        onChange={handleAttemptsChange}
    />  
    </div>

    <button onClick={handleGenerateClick}>Generate</button>
    </div>
    );
};

export default WordFilter;
