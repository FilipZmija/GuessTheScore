import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guessScore, setIsClicked, setSelectedGame } from "../redux/guessSlice";
export default function PopularGuesses() {
  const { isClicked, popularGuesses, selectedGame } = useSelector(
    (state) => state.guess
  );
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
