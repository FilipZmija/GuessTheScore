import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  CardMedia,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import SucessAlert from "./Alert";
import PopularGuesses from "./PopularGuesses";
import { guessScore, setGuessId, setIsClicked } from "../../redux/guessSlice";
import { setOpen } from "../../redux/errorSlice";
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
  fontWeight: "bold",
};
const scoreField = {
  width: { xs: "3rem", sm: "4.25rem", md: "4.25rem", lg: "4.25rem" },
  marginBottom: { xs: "20%", md: "30%" },
  borderRadius: "4px",
};

const guessCardStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#faf8f5",
  flexDirection: "column",
  padding: "0.5rem",
  "&:last-child": { paddingBottom: "0.5rem" },
};
const cardStyle = {
  padding: "4%",
  backgroundColor: "#EEE7DA",
  borderRadius: "10px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  margin: "0 0 3% 0",
  display: "inline-block",
};

const pulsateKeyframes = {
  "0%": { boxShadow: "0 0 0.3rem rgba(78, 159, 76, 1)" },
  "50%": { boxShadow: "0 0 1.5rem rgba(78, 159, 76, 1)" },
  "100%": { boxShadow: "0 0 0.3rem rgba(78, 159, 76, 1)" },
};

const pulsateStyle = {
  animation: "pulsate 2s infinite",
  "@keyframes pulsate": pulsateKeyframes,
};

const GameDetails = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const {
    guess,
    selectedGame,
    guessId,
    points,
    popularGuesses,
    currentPoints,
  } = useSelector((state) => state.guess);
  const eventId = selectedGame.id;
  const token = useSelector((state) => state.auth.token);
  const hasChanged = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasChanged.current) {
      return;
    } else {
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
            setAlertOpen(true);
            const { id } = newGuess.data.guess;
            dispatch(setGuessId(id));
          } catch (e) {
            dispatch(setAlertOpen(true));
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
            setAlertOpen(true);
            const { id } = newGuess.data.guess;
            dispatch(setGuessId(id));
          } catch (e) {
            dispatch(setOpen(true));
            console.error(e);
          }
        })();
      }
    }
  }, [guess, eventId, token, dispatch, guessId]);
  const [homeScore, awayScore] = selectedGame
    ? selectedGame.score.split(":")
    : [];
  const displayResultInfo = () => {
    if (points) {
      return (
        <Typography
          variant="h7"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            padding: "12px 0",
          }}
        >
          You scored: {points} points!
        </Typography>
      );
    } else if (
      (selectedGame.status === "IN_PLAY" || selectedGame.status === "PAUSED") &&
      currentPoints
    ) {
      return (
        <Typography
          variant="h7"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            padding: "12px 0",
          }}
        >
          Game in progress! Your possible points {currentPoints}!
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="h7"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            padding: "12px 0",
          }}
        >
          You have not guessed this game :(
        </Typography>
      );
    }
  };
  return (
    <Card
      sx={{
        ...cardStyle,
        ...(selectedGame.status === "IN_PLAY" ||
        selectedGame.status === "PAUSED"
          ? pulsateStyle
          : {}),
      }}
    >
      <CardContent sx={guessCardStyle}>
        <SucessAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {selectedGame.competition}
        </Typography>
        <Typography sx={{ fontWeight: "bold" }} variant="h7" gutterBottom>
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
                textAlign: "center",
              }}
            >
              {selectedGame.homeTeam}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              disabled={selectedGame.status !== "TIMED"}
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
                hasChanged.current = false;
                dispatch(
                  guessScore({
                    home: e.target.value.replace(/\D/, ""),
                    away: guess.away,
                  })
                );
                dispatch(setIsClicked());
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
              disabled={selectedGame.status !== "TIMED"}
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
                hasChanged.current = false;
                dispatch(
                  guessScore({
                    home: guess.home,
                    away: e.target.value.replace(/\D/, ""),
                  })
                );
                dispatch(setIsClicked());
              }}
              inputProps={{
                maxLength: 1,
                style: {
                  fontSize: "250%",
                  textAlign: "center",
                  padding: "15%",
                },
              }}
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
                textAlign: "center",
              }}
            >
              {selectedGame.awayTeam}
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        {selectedGame.status !== "TIMED" ? (
          <>{displayResultInfo()}</>
        ) : (
          <PopularGuesses
            popularGuesses={popularGuesses}
            hasChanged={hasChanged}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default GameDetails;
