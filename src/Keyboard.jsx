import React, { useEffect, useState } from "react";
import './Keyboard.css';

const Keyboard = ({ onLetterClick, guessedLetters }) => {
    const [letters, setLetters] = useState([]);
    const [correctGuesses, setCorrectGuesses] = useState(new Set());

    useEffect(() => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lettersArray = alphabet.split("").map(letter => ({ key: letter }));
        setLetters(lettersArray);
    }, []);

    const handleLetterClick = (letter) => {
        if (!guessedLetters.includes(letter)) {
            onLetterClick(letter);
        }
    };

    return (
        <div className="keyboard">
            {letters.map(({ key }) => (
                <div
                    key={key}
                    className={`keyboard-letter ${guessedLetters.includes(key) ? 'guessed' : ''}`}
                    onClick={() => handleLetterClick(key)}
                >
                    {key}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
