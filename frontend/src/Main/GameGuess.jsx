import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  CardMedia,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
const teamLogoStyle = {
  objectFit: "contain",
  width: { xs: "60px", sm: "90px", md: "90px", lg: "100px" },
  height: { xs: "60px", sm: "100px", md: "100px", lg: "110px" },
};
const teamName = {
  width: { xs: "70px", sm: "100px", md: "100px", lg: "120px" },

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const scoreField = {
  width: { xs: "60px", sm: "65px", md: "70px", lg: "75px" },
  marginBottom: { xs: "1.8rem", sm: "2rem" },
};
const guessCard = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
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
      <Card>
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
                sx={{ minHeight: "48px", textAlign: "center" }}
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
                  style: { fontSize: 40, textAlign: "center", padding: "8px" },
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
                    fontSize: "40px",
                    textAlign: "center",
                    padding: "8px",
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
                sx={{ minHeight: "48px", textAlign: "center" }}
              >
                {selectedGame.awayTeam}
              </Typography>
            </Grid>

            <Grid item></Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleGuessSubmit}
          >
            Submit Guess
          </Button>
        </CardContent>
      </Card>
    )
  );
};

export default GameDetails;
