import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  const handleAnswerInputChange = (event) => {
    event.persist();
    setAnswer(event.target.value);
  };

  const getCatInfo = () =>
    fetch("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": "b1b05aad-1944-40d4-a209-25ce8cbc43a3",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let currentCat = Math.floor(Math.random() * 67);
        setName(res[currentCat].name);
        setImage(res[currentCat].image.url);
        setCorrect(false);
      });

  useEffect(() => {
    getCatInfo();
  }, []);

  const checkAnswer = (event) => {
    event.preventDefault();
    if (answer.toLowerCase() == name.toLowerCase()) {
      setCorrect(true);
      setIncorrect(false);
      console.log("CORRECT");
      setStreak(streak + 1);
    } else {
      setIncorrect(true);
      setCorrect(false);
      console.log("INCORRECT");
      setStreak(0);
    }
  };

  return (
    <div className="App">
      <div className="Container">
        <img src={image} />
        <h2>Streak: {streak}</h2>
        <form onSubmit={checkAnswer}>
          <input
            id="answer"
            className="form-field"
            type="text"
            placeholder="What's that cat?"
            name="answer"
            value={answer}
            onChange={handleAnswerInputChange}
          />
          <br />
          {correct !== true && (
            <button className="form-field" type="submit">
              Go!
            </button>
          )}
          <br />
          {incorrect && <p>Not Quite, try again!</p>}
          {correct && <p>Correct, well done!</p>}
          <br />
        </form>
        {correct && (
          <button className="btn" onClick={getCatInfo}>
            Play again!
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
