import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  guessScore,
  setIsClicked,
  setPopularGuesses,
} from "../redux/guessSlice";
export default function PopularGuesses() {
  const { isClicked, popularGuesses, selectedGame } = useSelector(
    (state) => state.guess
  );
  useEffect(() => {
    if (!popularGuesses?.length) {
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
    }
  }, []);
  const dispatch = useDispatch();
  const handleToggle = (index, score) => {
    dispatch(setIsClicked(index));
    const [home, away] = score.split(":");
    dispatch(guessScore({ home, away }));
  };
  console.log(popularGuesses);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {popularGuesses?.map((popularGuess, index) => {
        const { number } = popularGuess;
        const { guesses } = selectedGame;
        const ratio =
          number && guesses
            ? Math.floor((number / guesses) * 100) + "%"
            : 0 + "%";

        return (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Button
                pill
                onClick={() => handleToggle(index, popularGuess.score)}
                sx={{
                  margin: "0px 4px",
                  padding: "2px  0px",
                  borderRadius: "999px",
                  border: "1px solid #EEE7DA",
                  backgroundColor: isClicked === index ? "#faf8f5" : "#88AB8E",
                  color: isClicked === index ? "#88AB8E" : "#faf8f5", // Adjust text color as needed
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  outline: "none",
                  width: "1rem !important",
                }}
              >
                {popularGuess.score}
              </Button>
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                {ratio}
              </Typography>
            </Box>
          </>
        );
      })}
    </Box>
  );
}
