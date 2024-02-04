import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  CardMedia,
  Skeleton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setPoints, setGuessId, guessScore } from "../../redux/guessSlice";

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

const scoreFieldSkeletons = {
  width: { xs: "3rem", sm: "4.25rem", md: "4.25rem", lg: "4.25rem" },
  borderRadius: "4px",
  height: "9vh",
};

const GameDetails = () => {
  const { guess, selectedGame, points, currentPoints } = useSelector(
    (state) => state.guess
  );
  const [teamHome, teamAway] = selectedGame.Teams;
  const { selectedUserId } = useSelector((state) => state.scoreboard);
  const { token, id } = useSelector((state) => state.auth);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const [homeScore, awayScore] = selectedGame
    ? selectedGame.score.split(":")
    : [];

  useEffect(() => {
    if (selectedUserId) {
      setUser();
      dispatch(setPoints({ points: null, currentPoints: null }));
      dispatch(guessScore({ home: null, away: null }));
      dispatch(setGuessId());
      (async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/guess/info`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            params: {
              EventId: selectedGame.id,
              UserId: selectedUserId,
            },
          }
        );

        console.log(data.guess);
        console.log(data.user);

        if (data.guess) {
          const { points, score, currentPoints, id } = data.guess;
          const [home, away] = score.split(":");
          dispatch(setPoints({ points, currentPoints }));
          dispatch(guessScore({ home, away }));
          dispatch(setGuessId(id));
        }
        setUser(data.user);
      })();
    }
  }, [selectedUserId, selectedGame.id, token, dispatch]);

  const displayResultInfo = () => {
    if (points != null) {
      return (
        <Typography
          variant="h7"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            padding: "12px 0",
          }}
        >
          {id === user.id
            ? `You scored: ${points} points!`
            : `${user.username} scored: ${points} points!`}
        </Typography>
      );
    } else if (
      (selectedGame.status === "IN_PLAY" || selectedGame.status === "PAUSED") &&
      currentPoints != null
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
          {id === user.id
            ? `Game in progress! Your possible points ${currentPoints}!`
            : `Game in progress! ${user.username} possible points ${currentPoints}!`}
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
          {id === user.id
            ? `You did not guess this game :(`
            : `${user.username} did not guess this game :(`}
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
              image={teamHome.crest}
              alt={`${teamHome.shortName} Crest`}
              sx={teamLogoStyle}
            />
            <Typography
              variant="h7"
              sx={{
                textAlign: "center",
              }}
            >
              {teamHome.shortName}
            </Typography>
          </Grid>
          <Grid item>
            {user ? (
              <TextField
                disabled
                autoComplete="off"
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
                inputProps={{
                  inputMode: "numeric",
                  maxLength: 1,
                  style: {
                    fontSize: "250%",
                    textAlign: "center",
                    padding: "15%",
                  },
                }}
                size="normal"
              />
            ) : (
              <Skeleton variant="rectangular" sx={scoreFieldSkeletons} />
            )}
          </Grid>
          <Grid item>
            {user ? (
              <TextField
                disabled
                autoComplete="off"
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
                inputProps={{
                  inputMode: "numeric",
                  maxLength: 1,
                  style: {
                    fontSize: "250%",
                    textAlign: "center",
                    padding: "15%",
                  },
                }}
              />
            ) : (
              <Skeleton variant="rectangular" sx={scoreFieldSkeletons} />
            )}
          </Grid>
          <Grid item sx={teamName}>
            <CardMedia
              component="img"
              image={teamAway.crest}
              alt={`${teamAway.shortName} Crest`}
              sx={teamLogoStyle}
            />
            <Typography
              variant="h7"
              sx={{
                textAlign: "center",
              }}
            >
              {teamAway.shortName}
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        {user ? (
          displayResultInfo()
        ) : (
          <Skeleton variant="text" sx={{ fontSize: "2rem", width: "80%" }} />
        )}
      </CardContent>
    </Card>
  );
};

export default GameDetails;
