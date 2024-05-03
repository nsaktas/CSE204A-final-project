import React, { useState } from 'react';
import './App.css';
import Keyboard from './Keyboard';
import './Keyboard.css';
import './WordBox.css';
import WordDisplay from './WordDisplay';
import WordFilter from './WordFilter';
import WordRow from './WordRow';


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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordBoxes, setWordBoxes] = useState(Array(5).fill(Array(5).fill('')));
  const [colorBoxes, setColorBoxes] = useState(Array(5).fill(Array(5).fill('gray')));


  const fetchWords = () => {
    let apiUrl = `https://random-word-api.vercel.app/api?words=1`;
    console.log(wordLength);
    console.log(firstLetter);

    if (wordLength) {
      apiUrl += `&length=${wordLength}`;
    }

    if (firstLetter) {
      apiUrl += `&letter=${firstLetter}`;
    }

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data[0]);
        console.log(wordLength);
        setWords(data);
        setIndexMap(createIndexMap(data[0]));

        console.log(data[0]);
      })
      .catch(error => console.error('Error fetching words:', error));
  };

    const createIndexMap = (str1) => {
      console.log('STR');
      const indexMap = {};
      const str = str1.toUpperCase();
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

    const handleWordLengthChange = (newLength) => {
      // console.log("word length change trigger to" + newLength)
      setWordLength(newLength);
    };

  const handleFirstLetterChange = newLetter => {
    const lowerCaseLetter = newLetter.toLowerCase();
    setFirstLetter(lowerCaseLetter);
  };
  

  const handleGenerateClick = () => {
    handleBoardStates();
    fetchWords();
  };

  const handleBoardStates = () => {
    setAttemptsMade(0);
    setIndexMap(null);
    setWordBoxes(Array(attempts).fill(Array(wordLength).fill('')));
    setCurrentIndex(0);
    setHints([]);
    setFirstLetter(firstLetter);
  };

  const handleAttemptsChange = newAttempts => {
    // console.log("attemptschange trigger to" + newAttempts)

    setAttempts(newAttempts);
  };
  

  const handleLetterClick = (key) => {
    if(key == 'Submit' && (currentIndex==wordLength)){
      setCurrentIndex(0);
      const tempDoubleArray = [...wordBoxes];
      const tempRow = [...tempDoubleArray[attemptsMade]];
      const tempMap = indexMap;
      const results = compareCharacters(tempRow, tempMap);
      console.log(results);

      const tempWord = tempRow.join('');

      setAttemptsMade(attemptsMade+1);
    }
    else if (key == 'Delete' && (currentIndex > 0)) {
      const tempCurrIndex = currentIndex-1;

      const tempDoubleArray = [...wordBoxes];
      const tempRow = [...tempDoubleArray[attemptsMade]];
      tempRow[tempCurrIndex] = '';
      tempDoubleArray[attemptsMade] = tempRow

      setCurrentIndex(currentIndex-1);
      setWordBoxes(tempDoubleArray);
    } else if((key != 'Submit') && (key != 'Delete') && (currentIndex < wordLength)) {
      console.log(key);
      var tempArray = attempts;
      // console.log(tempArray);

      const tempDoubleArray = [...wordBoxes];
      const tempRow = [...tempDoubleArray[attemptsMade]];
      tempRow[currentIndex] = key;
      tempDoubleArray[attemptsMade] = tempRow
      // console.log(tempDoubleArray);

      setWordBoxes(tempDoubleArray);
      setCurrentIndex(currentIndex+1)
    } else{
      console.log('nothing happened')
    }

};

const compareCharacters = (tempRow, tempMap) => {
  const results = [];

  for (let key in tempMap) {
    console.log(key);
  }

  for (let i = 0; i < tempRow.length; i++) {
    const char = tempRow[i];
    // Case 1: Character doesn't exist in indexMap
    console.log(char.toString);
    if (!tempMap.hasOwnProperty(char)) {
      results.push("red");
    } else {
      // Case 2: Character exists in indexMap but not in the correct spot
      if (!tempMap[char].includes(i)) {
        results.push("yellow");
      } else {
        // Case 3: Character exists in indexMap and in the correct spot
        results.push("green");
      }
    }
  }

  return results;
}

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
    {<p>Current Index: {currentIndex}</p>}
    {<p>Attempts Made: {attemptsMade}</p>}
    <p>Number of Attempts: {attempts}</p>

    <WordFilter
      onGenerate={handleGenerateClick}
      onWordLengthChange={handleWordLengthChange}
      onFirstLetterChange={handleFirstLetterChange}
      onAttemptsChange={handleAttemptsChange}
    />
    <button onClick={handleHintClick}>Hint</button>
    {hints && <p>{hints}</p>}
    <WordDisplay words={words} />

    {words.length > 0 &&  <div className="wordBoxes">
      {wordBoxes.map((wordRow, index) => (
        <WordRow key={index} wordRow={wordRow} />
      ))}
    </div>}
    
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
