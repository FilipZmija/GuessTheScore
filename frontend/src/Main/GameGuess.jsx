import React, { useEffect, useState, useRef } from "react";
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
  width: { xs: "120%", xl: "100%" },
  height: "10vh",
};
const teamName = {
  width: { xs: "5rem", sm: "6rem", md: "6rem", lg: "7rem" },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const scoreField = {
  width: { xs: "3rem", sm: "4.25rem", md: "4.25rem", lg: "4.25rem" },
  marginBottom: { xs: "40%", md: "50%" },
  borderRadius: "4px",
};

const guessCard = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#faf8f5",
  flexDirection: "column",
  padding: "0.5rem",
};
const GameDetails = ({
  selectedGame,
  setSelectedGame,
  guess,
  guessId,
  points,
  setGuess,
  setGuessId,
}) => {
  const eventId = selectedGame.id;
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const isFirstInit = useRef(true);

  useEffect(() => {
    if (isFirstInit.current) {
      isFirstInit.current = false;
      return;
    }
    const { home, away } = guess;
    if (home.length > 0 && away.length > 0 && eventId && !guessId) {
      (async () => {
        try {
          const newGuess = await axios.post(
            `${process.env.REACT_APP_API_URL}/guess/add`,
            {
              score: `${home}:${away}`,
              EventId: eventId,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setOpen(true);
          console.log(newGuess);
          const { id } = newGuess.data.guess;
          setGuessId(id);
        } catch (e) {
          console.error(e);
        }
      })();
    } else if (home.length > 0 && away.length > 0 && guessId && eventId) {
      (async () => {
        try {
          const newGuess = await axios.put(
            `${process.env.REACT_APP_API_URL}/guess/edit/${guessId}`,
            {
              score: `${home}:${away}`,
              EventId: eventId,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setOpen(true);
          const { id } = newGuess.data.guess;
          setGuessId(id);
          console.log(newGuess);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [guess, eventId, token]);
  const [homeScore, awayScore] = selectedGame
    ? selectedGame.score.split(":")
    : [];

  return (
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

        <Grid container alignItems="center" spacing={{ xs: 1, lg: 2 }}>
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
              sx={{
                minHeight: { sm: "0", md: "3rem" },
                textAlign: "center",
              }}
            >
              {selectedGame.homeTeam}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              disabled={selectedGame.status === "FINISHED"}
              name="home"
              sx={{
                ...scoreField,

                backgroundColor:
                  selectedGame.status === "FINISHED"
                    ? homeScore === guess.home
                      ? "rgba(50,205,50, 0.3)"
                      : "rgba(255,0,0, 0.2)"
                    : "",
              }}
              variant="outlined"
              value={guess?.home || ""}
              onChange={(e) => {
                setGuess((prev) => {
                  return {
                    ...prev,
                    home: e.target.value.replace(/\D/, ""),
                  };
                });
              }}
              inputProps={{
                maxLength: 1,
                style: {
                  fontSize: "250%",
                  textAlign: "center",
                  padding: "15%",
                },
              }}
              size="normal"
            />
          </Grid>

          <Grid item>
            <TextField
              disabled={selectedGame.status === "FINISHED"}
              name="away"
              sx={{
                ...scoreField,
                backgroundColor:
                  selectedGame.status === "FINISHED"
                    ? guess.away === awayScore
                      ? "rgba(50,205,50, 0.3)"
                      : "rgba(255,0,0, 0.2)"
                    : "",
              }}
              variant="outlined"
              value={guess?.away || ""}
              onChange={(e) => {
                setGuess((prev) => {
                  return {
                    ...prev,
                    away: e.target.value.replace(/\D/, ""),
                  };
                });
              }}
              inputProps={{
                maxLength: 1,
                style: {
                  fontSize: "250%",
                  textAlign: "center",
                  padding: "15%",
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
              sx={{
                minHeight: { sm: "0", md: "3rem" },
                textAlign: "center",
              }}
            >
              {selectedGame.awayTeam}
            </Typography>
          </Grid>

          <Grid item></Grid>
        </Grid>
        {points && (
          <Typography
            variant="h7"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            You scored: {points} points!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default GameDetails;
