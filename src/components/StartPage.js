import React from "react";

export default function StartPage(props) {
  return (
    <div className="start-container">
      <h2>Quizzical</h2>
      <p>a general knowledge multiple choice answers game</p>
      <button className="non-answer-btn" onClick={props.gameStarted}>
        Start Quiz
      </button>
    </div>
  );
}
