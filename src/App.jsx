import React, { useState } from 'react';
import './App.css';
import Keyboard from './Keyboard';
import './Keyboard.css';
import WordBox from './WordBox';
import './WordBox.css';
import WordDisplay from './WordDisplay';
import WordFilter from './WordFilter';

const App = () => {
  const [words, setWords] = useState([]);
  const [wordLength, setWordLength] = useState(5);
  const [firstLetter, setFirstLetter] = useState(null);
  const [attempts, setAttempts] = useState(5);
  const [hints, setHints] = useState([]);
  const [usedKeys, setUsedKeys] = useState({});
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [indexMap, setIndexMap] = useState(null);
  const [attemptsMade, setAttemptsMade] = useState(0);


  const fetchWords = () => {
    let apiUrl = `https://random-word-api.vercel.app/api?words=1`;

    if (wordLength) {
      apiUrl += `&length=${wordLength}`;
    }

    if (firstLetter) {
      apiUrl += `&letter=${firstLetter}`;
    }

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setWords(data);
        setIndexMap(createIndexMap(data[0]));
        console.log();



        console.log(data[0]);
      })
      .catch(error => console.error('Error fetching words:', error));
  };

    const createIndexMap = (str) => {
      const indexMap = {};
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (!indexMap[char]) {
          indexMap[char] = [i];
        } else {
          indexMap[char].push(i);
        }
      }
      return indexMap;
    };

  const handleWordLengthChange = newLength => {
    setWordLength(newLength);
  };

  const handleFirstLetterChange = newLetter => {
    setFirstLetter(newLetter);
  };

  const handleGenerateClick = () => {
    setAttemptsMade(0);
    setIndexMap(null);
    fetchWords();
    setHints([]);
  };

  const handleAttemptsChange = newAttempts => {
    setAttempts(newAttempts);
  };

  const handleLetterGuess = letter => {
    if (!usedKeys[letter]) {
      const isCorrectGuess = words[0].includes(letter);
      setGuessedLetters([...guessedLetters, { letter, isCorrect: isCorrectGuess }]);
      setUsedKeys({ ...usedKeys, [letter]: true });
    }
  };

  const handleLetterClick = (letter) => {
    setGuessedLetters([...guessedLetters, letter]);
};

  const fetchWordDefinition = word => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
        setHints(data[0].meanings[0].definitions[0].definition);
        } else {
        setHints('Definition not found');

        }
    })
    .catch(error => console.error('Error fetching word definition:', error));
};

const handleHintClick = () => {
  fetchWordDefinition(words[0]);
};

  return (

    // <>
    <div>
    <h1>Guess the Word!</h1>
    <WordFilter
      onGenerate={handleGenerateClick}
      onWordLengthChange={handleWordLengthChange}
      onFirstLetterChange={handleFirstLetterChange}
      onAttemptsChange={handleAttemptsChange}
    />
    <button onClick={handleHintClick}>Hint</button>
    {attemptsMade && <p>{attemptsMade}</p>}
    {hints && <p>{hints}</p>}
    <WordDisplay words={words} />
    {words.length > 0 && <WordBox word={words[0]} attempts={attempts} />}
    <p>Number of Attempts: {attempts}</p>
    {guessedLetters &&     <Keyboard onLetterClick={handleLetterClick} guessedLetters={guessedLetters} />}
    {/* <Keyboard onLetterClick={handleLetterClick} guessedLetters={guessedLetters} /> */}

    
    <div>
      <h2>Guessed Letters</h2>
      <ul>
        {guessedLetters.map((letter, index) => (
          <li key={index}>{letter}</li>
        ))}
      </ul>
    </div>
    {indexMap && (
  <>
    {Object.keys(indexMap).map((char, index) => (
      <li key={index}>
        {char}: [{indexMap[char].join(', ')}]
      </li>
    ))}
  </>
)}

  </div>
    
    
    // </>
  );
};


export default App;
