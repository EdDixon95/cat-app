import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const handleAnswerInputChange = (event) => {
    event.persist();
    setAnswer(event.target.value);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
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
      });
  }, []);

  const checkAnswer = (event) => {
    event.preventDefault();
    if (answer == name) {
      setCorrect(true);
      console.log("CORRECT");
    } else {
      setIncorrect(true);
      console.log("INCORRECT");
    }
  };

  return (
    <div className="App">
      <div className="Container">
        <img src={image} />
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
          <button className="form-field" type="submit">
            Go!
          </button>
          <br />
          {incorrect && <p>Not Quite, try again!</p>}
          {correct && <p>Correct, well done!</p>}
          <br />
          {correct && (
            <button className="btn" onClick={refreshPage}>
              Play again!
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
