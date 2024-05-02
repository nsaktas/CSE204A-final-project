import React from 'react';

const WordBox = ({ word, attempts }) => {
    const getBoxKey = (attemptIndex, letterIndex) => attemptIndex * word.length + letterIndex;

    return (
        <div className="word-boxes">
            {[...Array(attempts)].map((_, attemptIndex) => (
                <div key={attemptIndex} className="word-row">
                    <div className="horizontal-row">
                        {word.split('').map((_, letterIndex) => (
                            <button
                                key={getBoxKey(attemptIndex, letterIndex)}
                                className="word-button"
                                style={{ backgroundColor: 'lightblue', border: '1px solid black' }}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WordBox;
