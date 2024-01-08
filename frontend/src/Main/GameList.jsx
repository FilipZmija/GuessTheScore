import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
const gameContainerStyle = {
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
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
    transform: "scale(1.05)", // Increase the size by 5% on hover
  },
  "&:active": {
    animation: "press 0.2s 1 linear",
    "@keyframes press": press,
  },
};

const teamLogoStyle = {
  height: "40px",
  objectFit: "contain",
};
const teamName = {
  width: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const pulsateKeyframes = {
  "0%": { boxShadow: "0 0 2px rgba(78, 159, 76, 1)" },
  "50%": { boxShadow: "0 0 15px rgba(78, 159, 76, 1)" },
  "100%": { boxShadow: "0 0 2px rgba(78, 159, 76, 1)" },
};

const pulsateStyle = {
  animation: "pulsate 2s infinite",
  "@keyframes pulsate": pulsateKeyframes,
};

const clickedCardStyle = {
  boxShadow: "0px 0px 20px -2px rgba(66, 68, 90, 1) !important",
};

const GameCard = ({ game }) => {
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
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = ({ onClick }) => {
    setIsClicked(!isClicked);
    if (onClick) {
      onClick(game); // Pass the game data to the parent component if needed
    }
  };
  return (
    <Card
      isClicked={isClicked}
      onClick={handleClick}
      sx={{
        ...cardStyle,
        ...(status === "IN_PLAY" || status === "PAUSED" ? pulsateStyle : {}),
        ...(isClicked ? clickedCardStyle : {}),
      }}
      className={isClicked ? "clicked-card" : ""}
    >
      <CardContent sx={{ padding: "8px !important" }}>
        <Typography variant="h5">{competition}</Typography>
        <Typography variant="h7">{utcTime}</Typography>
        <Grid container alignItems="center" spacing={2}>
          <Grid item></Grid>
          <Grid item sx={teamName}>
            <CardMedia
              component="img"
              width="40"
              image={homeTeamCrest}
              alt={`${homeTeam} Crest`}
              sx={teamLogoStyle}
            />
            <Typography variant="body2">{homeTeam}</Typography>
          </Grid>
          <Grid item sx={{ marginBottom: "15px" }}>
            <Typography variant="h3">{score}</Typography>
          </Grid>

          <Grid item sx={teamName}>
            <CardMedia
              component="img"
              width="70"
              image={awayTeamCrest}
              alt={`${awayTeam} Crest`}
              sx={teamLogoStyle}
            />
            <Typography variant="body2">{awayTeam}</Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const GamesList = ({ games }) => {
  return (
    <Container sx={gameContainerStyle}>
      {games.map((game) => (
        <Box
          key={game.id}
          sx={{
            padding: "5px",
            marginTop: "5px",
            minWidth: "315px",
            maxWidth: "400px",
          }}
        >
          <GameCard game={game} />
        </Box>
      ))}
    </Container>
  );
};

export default GamesList;
