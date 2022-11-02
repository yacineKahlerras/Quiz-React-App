import React from "react";
import Quiz from "./Quiz";
import { nanoid } from "nanoid";
import { getData, checkAnswers, restartGame } from "./MainHandlers";
import Loading from "./Loading";

export default function Main() {
  const apiURL =
    "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple";
  const [quizes, setQuizes] = React.useState([]);
  const [finishedQuizes, setFinishedQuizes] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [score, setScore] = React.useState(false);

  //   fetching data at start only
  React.useEffect(() => {
    getData(setQuizes, apiURL, setIsLoading);
  }, []);

  // quiz elements
  const quizElements = quizes.map((q) => (
    <Quiz
      key={nanoid()}
      {...q}
      answerMethod={chooseAnswer}
      finished={finishedQuizes}
    />
  ));

  // when clicking on an answer set user answer as that
  function chooseAnswer(question, userAnswer) {
    setQuizes((prevQuizes) =>
      prevQuizes.map((quizInfo) => ({
        ...quizInfo,
        userAnswer:
          quizInfo.question === question ? userAnswer : quizInfo.userAnswer,
      }))
    );
  }

  //   submit button
  const submitContainer = (
    <div className="submit-container">
      {finishedQuizes && <p>You scored {score} / 5 correct answers</p>}
      <button
        onClick={
          finishedQuizes
            ? () =>
                restartGame(
                  setQuizes,
                  apiURL,
                  setFinishedQuizes,
                  setScore,
                  setIsLoading
                )
            : () => checkAnswers(quizes, setScore, setFinishedQuizes)
        }
        className="non-answer-btn"
      >
        {finishedQuizes ? "Play Again" : "Check Answers"}
      </button>
    </div>
  );

  return (
    <div className="quiz-container">
      {quizElements}
      {isLoading ? <Loading /> : submitContainer}
    </div>
  );
}
