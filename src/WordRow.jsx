import React from 'react';
import './WordRow.css';


const WordRow = ({ wordRow }) => {
  return (
    <div className="word-row">
      {wordRow.map((box, index) => (
        <div key={index} className="word-box">{box}</div>
      ))}
    </div>
  );
};

export default WordRow;
