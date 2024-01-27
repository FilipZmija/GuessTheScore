import React, { useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  guessScore,
  setIsClicked,
  setPopularGuesses,
} from "../../redux/guessSlice";

const toggleButtonStyle = {
  margin: "0px 4px",
  padding: "2px  0px",
  borderRadius: "999px",
  border: "1px solid #EEE7DA",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "bold",
  outline: "none",
  width: "1rem !important",
};
const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
const buttonsContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
};
export default function PopularGuesses({ hasChanged }) {
  const { isClicked, popularGuesses, selectedGame, guess } = useSelector(
    (state) => state.guess
  );
  const scoreboardId = useSelector((state) => state.scoreboard.scoreboardId);
  const dispatch = useDispatch();

  useEffect(() => {
    const { home, away } = guess;
    if (!popularGuesses) {
      const generateGuesses = () => {
        const guesses = [
          "1:0",
          "1:1",
          "2:0",
          "2:1",
          "2:2",
          "3:0",
          "3:1",
          "3:2",
          "3:3",
          "4:0",
          "4:1",
          "4:2",
          "4:3",
          "4:4",
          "0:1",
          "0:2",
          "1:2",
          "1:3",
          "2:3",
          "3:4",
        ];

        const popular = [];
        for (let i = 0; i < 3; i++) {
          const index = Math.floor(Math.random() * guesses.length);
          popular.push({ number: 0, score: guesses[index] });
          guesses.splice(index, 1);
        }
        return popular;
      };

      dispatch(setPopularGuesses(generateGuesses()));
    } else {
      popularGuesses.forEach((item, index) => {
        item.score === home + ":" + away && dispatch(setIsClicked(index));
      });
    }
  }, [scoreboardId, popularGuesses, dispatch, guess]);

  const handleToggle = (index, score) => {
    hasChanged.current = false;
    dispatch(setIsClicked(index));
    const [home, away] = score.split(":");
    dispatch(guessScore({ home, away }));
  };

  return (
    <>
      <Box key={"main-container"} sx={buttonsContainerStyle}>
        {popularGuesses?.map((popularGuess, index) => {
          const { number } = popularGuess;
          const { guesses } = selectedGame;
          const ratio =
            number && guesses
              ? Math.floor((number / guesses) * 100) + "%"
              : 0 + "%";

          return (
            <Box sx={buttonContainerStyle} key={"popular-guess-box-" + index}>
              <Button
                pill="true"
                onClick={() => handleToggle(index, popularGuess.score)}
                sx={{
                  ...toggleButtonStyle,
                  backgroundColor: isClicked === index ? "#faf8f5" : "#88AB8E",
                  color: isClicked === index ? "#88AB8E" : "#faf8f5",
                }}
              >
                {popularGuess.score}
              </Button>
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                {ratio}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
