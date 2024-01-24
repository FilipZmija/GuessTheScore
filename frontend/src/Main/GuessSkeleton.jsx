import React from "react";
import { Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const teamLogoStyle = {
  objectFit: "contain",
  width: "150%",
  height: "10vh",
};
const teamName = {
  width: { xs: "4rem", sm: "6rem", md: "6rem", lg: "7rem" },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const scoreField = {
  width: { xs: "3rem", sm: "4.25rem", md: "4.25rem", lg: "4.25rem" },
  marginBottom: { xs: "40%", md: "50%" },
  borderRadius: "4px",
};
const scoreFieldSkeletons = {
  width: { xs: "3rem", sm: "4.25rem", md: "4.25rem", lg: "4.25rem" },
  borderRadius: "4px",
};
const guessCard = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#faf8f5",
  flexDirection: "column",
  padding: "0.5rem",
};
const GameDetails = () => {
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
        <>
          <Skeleton variant="text" sx={{ fontSize: "1.75rem", width: "80%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1.25rem", width: "60%" }} />
        </>

        <Grid container alignItems="center" spacing={2}>
          <Grid item></Grid>

          <Grid item sx={teamName}>
            <></>
            <Skeleton
              variant="rectangular"
              sx={{ ...scoreFieldSkeletons, height: "9vh" }}
            />
          </Grid>
          <Grid item>
            <Skeleton
              variant="rectangular"
              sx={{ ...scoreFieldSkeletons, height: "9vh" }}
            />
          </Grid>

          <Grid
            item
            sx={{
              paddingLeft: { xs: "8px !important" },
              paddingRight: { xs: "8px !important" },
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{ ...scoreFieldSkeletons, height: "9vh" }}
            />
          </Grid>
          <Grid
            item
            sx={{ ...teamName, paddingLeft: { xs: "8px !important" } }}
          >
            <Skeleton
              variant="rectangular"
              sx={{ ...scoreFieldSkeletons, height: "9vh" }}
            />
          </Grid>

          <Grid item></Grid>
        </Grid>
        <Skeleton variant="text" sx={{ fontSize: "2rem", width: "80%" }} />
      </CardContent>
    </Card>
  );
};

export default GameDetails;
