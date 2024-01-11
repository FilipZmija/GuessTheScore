import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  CardMedia,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
const teamLogoStyle = {
  objectFit: "contain",
  width: "100%",
  height: "100%",
};
const teamName = {
  width: { xs: "4rem", sm: "6rem", md: "6rem", lg: "7rem" },

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const scoreField = {
  width: { xs: "3.5rem", sm: "4.25rem", md: "4.25rem", lg: "4.25rem" },
  marginBottom: "50%",
};
const guessCard = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#faf8f5",
  flexDirection: "column",
  padding: "0.5rem",
};
const GameDetails = () => {
  const [homeTeamGuess, setHomeTeamGuess] = useState("");
  const [awayTeamGuess, setAwayTeamGuess] = useState("");
  const selectedGameIndex = useSelector((state) => state.events.selection);
  const selectedGame = useSelector((state) => {
    if (state.events.gameList) return state.events.gameList[selectedGameIndex];
  });
  const dispatch = useDispatch();
  const handleGuessSubmit = () => {
    // Assuming you have an action to update guesses in your Redux store
    // dispatch(updateGuess(selectedGame.index, homeTeamGuess, awayTeamGuess));
  };

  return (
    selectedGame && (
      <Card
        sx={{
          padding: "4%",
          backgroundColor: "#EEE7DA",
          borderRadius: "10px",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          margin: "0 -10% 3% -10%",
          display: "inline-block",
        }}
      >
        <CardContent sx={guessCard}>
          <Typography variant="h5">{selectedGame.competition}</Typography>
          <Typography variant="h7" gutterBottom>
            {selectedGame.utcTime}
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid item></Grid>

            <Grid item sx={teamName}>
              <CardMedia
                component="img"
                image={selectedGame.homeTeamCrest}
                alt={`${selectedGame.homeTeam} Crest`}
                sx={teamLogoStyle}
              />
              <Typography
                variant="h7"
                sx={{ minHeight: "3rem", textAlign: "center" }}
              >
                {selectedGame.homeTeam}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                sx={scoreField}
                variant="outlined"
                value={homeTeamGuess}
                onChange={(e) =>
                  setHomeTeamGuess(e.target.value.replace(/\D/, ""))
                }
                inputProps={{
                  maxLength: 1,
                  style: {
                    fontSize: "250%",
                    textAlign: "center",
                    padding: "8px",
                  },
                }}
                size="normal"
              />
            </Grid>

            <Grid item>
              <TextField
                sx={scoreField}
                variant="outlined"
                value={awayTeamGuess}
                onChange={(e) =>
                  setAwayTeamGuess(e.target.value.replace(/\D/, ""))
                }
                inputProps={{
                  maxLength: 1,
                  style: {
                    fontSize: "250%",
                    textAlign: "center",
                    padding: "0.5rem",
                  },
                }} // Limiting the length to 2 characters
              />
            </Grid>

            <Grid item sx={teamName}>
              <CardMedia
                component="img"
                image={selectedGame.awayTeamCrest}
                alt={`${selectedGame.awayTeam} Crest`}
                sx={teamLogoStyle}
              />
              <Typography
                variant="h7"
                sx={{ minHeight: "3rem", textAlign: "center" }}
              >
                {selectedGame.awayTeam}
              </Typography>
            </Grid>

            <Grid item></Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  );
};

export default GameDetails;
