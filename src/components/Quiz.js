import React from "react";
import { nanoid } from "nanoid";
import ReactMarkdown from "react-markdown";
import { getClassName, getStyle } from "./MainHandlers";

export default function Quiz(props) {
  // answer buttons
  const answers = props.answers.map((answer) => {
    return (
      <button
        onClick={() => {
          props.answerMethod(props.question, answer);
        }}
        key={nanoid()}
        className={getClassName(props, answer)}
        style={getStyle(props, answer)}
      >
        <ReactMarkdown>{answer}</ReactMarkdown>
      </button>
    );
  });

  return (
    <div className="quiz">
      <h1>
        <ReactMarkdown>{props.question}</ReactMarkdown>
      </h1>
      <div className="answers-container">{answers}</div>
    </div>
  );
}
