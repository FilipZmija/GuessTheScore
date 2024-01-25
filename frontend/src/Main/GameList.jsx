import React from "react";
import GameCard from "./GameCard";
import { Box } from "@mui/system";
import { Container } from "@mui/material";

const gameContainerStyle = {
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const gameBoxStyle = {
  padding: "5px",
  marginTop: "5px",
  minWidth: "315px",
  maxWidth: "400px",
};

const GamesList = ({ games }) => {
  return (
    <Container sx={gameContainerStyle}>
      {games.map((game, index) => (
        <Box key={game.id} sx={gameBoxStyle}>
          <GameCard game={game} index={index} />
        </Box>
      ))}
    </Container>
  );
};

export default GamesList;
