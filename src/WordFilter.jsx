import React, { useState } from 'react';

const WordFilter = ({ onGenerate, onWordLengthChange, onFirstLetterChange, onAttemptsChange }) => {
const [attempts, setAttempts] = useState('');

const handleAttemptsChange = event => {
    const newAttempts = parseInt(event.target.value);
    setAttempts(newAttempts);
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
    <div>
    <h2>Word Filters</h2>
    <label htmlFor="wordLength">Word Length:</label>
    <input
        type="number"
        id="wordLength"
        min="1"
        onChange={handleWordLengthChange}
    />
    <label htmlFor="firstLetter">First Letter:</label>
    <input
        type="text"
        id="firstLetter"
        maxLength="1"
        onChange={handleFirstLetterChange}
    />
    <label htmlFor="attempts">Number of Attempts:</label>
    <input
        type="number"
        id="attempts"
        min="1"
        value={attempts}
        onChange={handleAttemptsChange}
    />
    <button onClick={handleGenerateClick}>Generate</button>
    </div>
    );
};

export default WordFilter;
