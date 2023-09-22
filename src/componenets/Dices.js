import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import images1 from "../image/images 1.png";
import images2 from "../image/images 2.png";
import images3 from "../image/images 3.png";
import images4 from "../image/images 4.png";
import images5 from "../image/images 5.png";

import "./Dices.css";

function Dicee() {
  const [value, setValue] = useState("");
  const [num, setNum] = useState("");
  const [tossResult, setTossResult] = useState("");
  const [tossOutcome, setTossOutcome] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [lostToss, setLostToss] = useState(false);
  const navigate = useNavigate();

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleNumChange = (event) => {
    let inputValue = event.target.value;

    if (inputValue < 1) {
      inputValue = 1;
    } else if (inputValue > 5) {
      inputValue = 5;
    }

    setNum(inputValue);
  };

  const handleButtonClick = () => {
    const userInput = Number(num);
    console.log("num", userInput);

    const player1Image = getImageByNumber(userInput);
    document.querySelectorAll(".img1")[0].setAttribute("src", player1Image);

    const randomNumber2 = Math.floor(Math.random() * 5) + 1;
    const player2Image = getImageByNumber(randomNumber2);
    document.querySelectorAll(".img2")[0].setAttribute("src", player2Image);

    if ((userInput + randomNumber2) % 2 === 0) {
      setTossResult("Even");
    } else {
      setTossResult("Odd");
    }
    setShowOption(true);
  };

  useEffect(() => {
    if (tossResult !== "") {
      if (tossResult === value) {
        setTossOutcome("you won the toss");
        alert("You won the toss");
      } else {
        setTossOutcome("you lost the toss");
        alert("You lost the toss");
        const randomOption = Math.random() < 0.5 ? "batting" : "bowling";
        setSelectedOption(randomOption);
        setLostToss(true); // User lost the toss
      }
    }
  }, [tossResult, value]);

  const getImageByNumber = (number) => {
    switch (number) {
      case 1:
        return images1;
      case 2:
        return images2;
      case 3:
        return images3;
      case 4:
        return images4;
      case 5:
        return images5;
      default:
        return "";
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionSubmit = () => {
    if (selectedOption === "batting") {
      navigate("/batting");
    } else if (selectedOption === "bowling") {
      navigate("/bowling");
    }
  };

  const handleLoseClick = () => {
    if (selectedOption === "batting") {
      navigate("/batting");
    } else if (selectedOption === "bowling") {
      navigate("/bowling");
    }
  };

  return (
    <div className="container">
      <div className="container1">
        {/* <h1>Welcome to the thrilling world of Hand Cricket!</h1>
        <br /> */}
        <h1> welcome to hand cricket</h1>
        <div className="beg-toss-conTainer">
          <select id="value" value={value} onChange={handleValueChange}>
            <option value="">Select an option</option>
            <option value="Even">Even</option>
            <option value="Odd">Odd</option>
          </select>
          <input
            type="number"
            id="num"
            value={num}
            onChange={handleNumChange}
          />
          <button type="submit" onClick={handleButtonClick}>
            Submit
          </button>
        </div>
      </div>
      {/* <h2 id="toss">{tossResult}</h2>
      <h1 className="text">Hand cricket</h1> */}
      <div className="container2">
        <div className="hand">
          <h1>YOU</h1>
          <img className="img1" src={images1} alt="Player 1" />
        </div>
        <p>VS</p>
        <div className="hand">
          <h1>Computer</h1>
          <img className="img2" src={images1} alt="Player 2" />
        </div>
      </div>
      <div className="container3">
        <input
          type="button"
          value="Reload"
          onClick={() => document.location.reload()}
        />
        <br />
      </div>
      {tossResult === value && showOption && (
        <div className="output-result">
          <p>Select an option:</p>
          <div className="output-result-choose">
            <select id="outcome" onChange={handleOptionChange}>
              <option value="">Select an option</option>
              <option value="batting">Batting</option>
              <option value="bowling">Bowling</option>
            </select>
            <button type="submit" onClick={handleOptionSubmit}>
              Submit Option
            </button>
          </div>
        </div>
      )}
      {lostToss && (
        <div className="lose-button">
          <button onClick={handleLoseClick}>Start</button>
        </div>
      )}
    </div>
  );
}

export default Dicee;
