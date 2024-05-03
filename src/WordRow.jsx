import React from 'react';
import './WordRow.css';


const WordRow = ({ wordRow, colorRow }) => {
  return (
    <div className="word-row">
      {wordRow.map((box, index) => (
        <div key={index} className="word-box" style={{ backgroundColor: colorRow[index] }}>{box}</div>
        ))}
    </div>
  );
};

export default WordRow;
