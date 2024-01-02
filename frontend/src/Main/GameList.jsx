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

const gameContainerStyle = {
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "#faf8f5",
  flexDirection: "column",
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

const GameCard = ({ game }) => {
  const {
    competition,
    date,
    utcTime,
    homeTeam,
    homeTeamCrest,
    awayTeam,
    awayTeamCrest,
    score,
    status,
  } = game;

  return (
    <Card
      sx={
        status !== "IN_PLAY"
          ? cardStyle
          : {
              ...cardStyle,
              ...pulsateStyle,
            }
      }
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
