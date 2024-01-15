import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  CardMedia,
} from "@mui/material";
import { useSelector } from "react-redux";
import SucessAlert from "./Alert";
import axios from "axios";
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
  const [guess, setGuess] = useState({ home: "", away: "" });
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const selectedGameIndex = useSelector((state) => state.events.selection);
  const selectedGame = useSelector((state) => {
    if (state.events.gameList) return state.events.gameList[selectedGameIndex];
  });

  const eventId = selectedGame?.id;
  useEffect(() => {
    setOpen(false);
    setGuess({ home: "", away: "" });
  }, [selectedGame, setOpen, setGuess]);

  useEffect(() => {
    eventId &&
      (async () => {
        try {
          const guess = await axios.get(
            `${process.env.REACT_APP_API_URL}/event/guesses/${selectedGame.id}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          console.log(guess);
        } catch (e) {
          console.error(e);
        }
      })();
  }, [eventId, token]);

  useEffect(() => {
    const { home, away } = guess;
    if (home.length > 0 && away.length > 0) {
      eventId &&
        (async () => {
          try {
            const guess = await axios.post(
              `${process.env.REACT_APP_API_URL}/guess/add`,
              {
                score: `${home}:${away}`,
                EventId: selectedGame.id,
              },
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
            console.log(guess, eventId, token);
            setOpen(true);
          } catch (e) {
            console.error(e);
          }
        })();
    }
  }, [guess]);

  return (
    selectedGame && (
      <Card
        sx={{
          padding: "4%",
          backgroundColor: "#EEE7DA",
          borderRadius: "10px",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          margin: "0 0 3% 0",
          display: "inline-block",
        }}
      >
        <CardContent sx={guessCard}>
          <SucessAlert open={open} setOpen={setOpen} />

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
                value={guess.home}
                onChange={(e) => {
                  setGuess((prev) => {
                    return { ...prev, home: e.target.value.replace(/\D/, "") };
                  });
                }}
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
                value={guess.away}
                onChange={(e) => {
                  setGuess((prev) => {
                    return { ...prev, away: e.target.value.replace(/\D/, "") };
                  });
                }}
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
