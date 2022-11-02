import React from "react";
import "../styles/style.css";
import Main from "./Main";
import StartPage from "./StartPage";

export default function App() {
  const [gameStarted, setGameStarted] = React.useState(false);

  return (
    <main>
      {gameStarted ? (
        <Main />
      ) : (
        <StartPage gameStarted={() => setGameStarted(true)} />
      )}
    </main>
  );
}
