import React from "react";
import { Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectEvent } from "../redux/eventsSlice";
const press = {
  "0%": {
    transform: "scale(1.05)",
  },
  "50%": {
    transform: "scale(0.92)",
  },
  to: {
    transform: "scale(1)",
  },
};

const cardStyle = {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "#faf8f5",
  flexDirection: "column",
  transition: "transform 0.1s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:active": {
    animation: "press 0.2s 1 linear",
    "@keyframes press": press,
  },
};

const teamLogoStyle = {
  height: "2.5rem",
  objectFit: "contain",
};
const teamNameStyle = {
  width: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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

const clickedCardStyle = {
  boxShadow: "0px 0px 1.50rem -0.075px rgba(66, 68, 90, 1) !important",
};

const GameCard = ({ game, index }) => {
  const {
    competition,
    utcTime,
    homeTeam,
    homeTeamCrest,
    awayTeam,
    awayTeamCrest,
    score,
    status,
  } = game;
  const selectedIndex = useSelector((state) => state.events.selection);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectEvent(index));
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        ...cardStyle,
        ...(status === "IN_PLAY" || status === "PAUSED" ? pulsateStyle : {}),
        ...(selectedIndex === index ? clickedCardStyle : {}),
      }}
    >
      <CardContent sx={{ padding: "8px !important" }}>
        <Typography variant="h5">{competition}</Typography>
        <Typography variant="h7">{utcTime}</Typography>
        <Grid container alignItems="center" spacing={2}>
          <Grid item></Grid>
          <Grid item sx={teamNameStyle}>
            <CardMedia
              component="img"
              width="2.5rem"
              image={homeTeamCrest}
              alt={`${homeTeam} Crest`}
              sx={teamLogoStyle}
            />
            <Typography sx={{ fontWeight: "bold" }} variant="body2">
              {homeTeam}
            </Typography>
          </Grid>
          <Grid item sx={{ marginBottom: "15px" }}>
            <Typography variant="h3">{score}</Typography>
          </Grid>

          <Grid item sx={teamNameStyle}>
            <CardMedia
              component="img"
              width="2.5rem"
              image={awayTeamCrest}
              alt={`${awayTeam} Crest`}
              sx={teamLogoStyle}
            />
            <Typography sx={{ fontWeight: "bold" }} variant="body2">
              {awayTeam}
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default GameCard;
