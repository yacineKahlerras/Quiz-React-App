// shuffles all the answers
export function randomizeAnswers(wrongAnswers, correctAnswer) {
  const randomPosition = Math.random() * wrongAnswers.length;
  wrongAnswers.splice(randomPosition, 0, correctAnswer);
  return wrongAnswers;
}

//   fetching data and putting in state
export function getData(setQuizes, apiURL, setIsLoading) {
  setIsLoading(true);
  setQuizes([]);
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      setQuizes(
        data.results.map((r) => {
          return {
            question: r.question,
            correct_answer: r.correct_answer,
            answers: randomizeAnswers(r.incorrect_answers, r.correct_answer),
            userAnswer: "",
          };
        })
      );
      setIsLoading(false);
    });
}

// checks answers and gives a score
export function checkAnswers(quizes, setScore, setFinishedQuizes) {
  // check if all questions are answered
  let allQuestionsAnswered = true;
  quizes.every((quiz) => {
    if (quiz.userAnswer === "") {
      allQuestionsAnswered = false;
      return false;
    }
    return true;
  });
  if (!allQuestionsAnswered) return;

  // calculating scores
  let tempScore = 0;
  quizes.forEach((quiz) => {
    if (quiz.userAnswer === quiz.correct_answer) {
      tempScore++;
    }
  });
  setScore(tempScore);
  setFinishedQuizes(true);
}

//restarts the game
export function restartGame(
  setQuizes,
  apiURL,
  setFinishedQuizes,
  setScore,
  setIsLoading
) {
  setScore(0);
  setFinishedQuizes(false);
  getData(setQuizes, apiURL, setIsLoading);
}

// sorts the class name
export function getClassName(props, answer) {
  let className = "";
  if (props.userAnswer === answer) className += "selected ";
  if (answer === props.correct_answer && props.finished)
    className += "correct-answer ";
  if (
    props.userAnswer === answer &&
    props.userAnswer !== props.correct_answer &&
    props.finished
  )
    className += "wrong-answer ";

  return className;
}

// sorts the Style of buttons
export function getStyle(props, answer) {
  if (answer !== props.correct_answer && props.finished)
    return { opacity: 0.5 };
}
