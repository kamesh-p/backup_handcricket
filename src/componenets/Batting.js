import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ScoreContext } from "./context/store-context";
import images1 from "../image/images 1.png";
import images2 from "../image/images 2.png";
import images3 from "../image/images 3.png";
import images4 from "../image/images 4.png";
import images5 from "../image/images 5.png";
import "./Batting.css";

const Batting = () => {
  const { totalScore, setTotalScore } = useContext(ScoreContext);
  const [player1Image, setPlayer1Image] = useState(images1);
  const [player2Image, setPlayer2Image] = useState(images1);
  const [player1Number, setPlayer1Number] = useState("");
  const [player2Number, setPlayer2Number] = useState("");
  const [isPlayer1Out, setIsPlayer1Out] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleKeyPress = (event) => {
    const number = parseInt(event.key);
    if (number >= 1 && number <= 5 && !isGameOver) {
      setPlayer1Number(number);
      setPlayer1Image(getImageByNumber(number));

      const player2Number = getRandomNumber();
      setPlayer2Number(player2Number);
      setPlayer2Image(getImageByNumber(player2Number));

      if (player2Number === number) {
        setIsPlayer1Out(true);
        setTimeout(() => {
          setShowNextButton(true);
        }, 3000);
      } else {
        setTotalScore((prevScore) => prevScore + number);
      }
    }
  };

  console.log("ts", totalScore);
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (isPlayer1Out) {
      setIsGameOver(true);
    }
  }, [isPlayer1Out]);

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
  return (
    <div className="batting-container">
      <h1 className="batting-heading">Batting</h1>
      <div className="batting-game-Container">
        <div className="hand">
          <h1>You</h1>
          <img className="img1" src={player1Image} alt="Player 1" />
        </div>
        <div className="hand">
          <h1>Computer</h1>
          <img className="img2" src={player2Image} alt="Player 2" />
        </div>
      </div>
      <button className="bat-back">
        <Link to="/">Back</Link>
      </button>
      {isPlayer1Out && showNextButton && (
        <button className="bat-back">
          <Link to="/bowling">Next</Link>
        </button>
      )}
      {isPlayer1Out && (
        <div className="out-message">
          <p>Oops... you are out!</p>
          <p>Total Score: {totalScore}</p>
        </div>
      )}
    </div>
  );
};

export default Batting;
