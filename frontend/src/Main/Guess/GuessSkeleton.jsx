import React from "react";
import { Card, CardContent, Grid, Skeleton } from "@mui/material";

const teamNameStyle = {
  width: { xs: "4rem", sm: "6rem", md: "6rem", lg: "7rem" },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const scoreFieldSkeletons = {
  width: { xs: "3rem", sm: "4.25rem", md: "4.25rem", lg: "4.25rem" },
  borderRadius: "4px",
  height: "9vh",
};

const guessCardStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#faf8f5",
  flexDirection: "column",
  padding: "0.5rem",
};

const cardStyle = {
  padding: "4%",
  backgroundColor: "#EEE7DA",
  borderRadius: "10px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  margin: "0 0 3% 0",
  display: "inline-block",
};

const GameDetails = () => {
  return (
    <Card sx={cardStyle}>
      <CardContent sx={guessCardStyle}>
        <>
          <Skeleton variant="text" sx={{ fontSize: "1.75rem", width: "80%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1.25rem", width: "60%" }} />
        </>

        <Grid container alignItems="center" spacing={2}>
          <Grid item></Grid>

          <Grid item sx={teamNameStyle}>
            <></>
            <Skeleton variant="rectangular" sx={scoreFieldSkeletons} />
          </Grid>
          <Grid item>
            <Skeleton variant="rectangular" sx={scoreFieldSkeletons} />
          </Grid>

          <Grid
            item
            sx={{
              paddingLeft: { xs: "8px !important" },
              paddingRight: { xs: "8px !important" },
            }}
          >
            <Skeleton variant="rectangular" sx={scoreFieldSkeletons} />
          </Grid>
          <Grid
            item
            sx={{ ...teamNameStyle, paddingLeft: { xs: "8px !important" } }}
          >
            <Skeleton variant="rectangular" sx={scoreFieldSkeletons} />
          </Grid>

          <Grid item></Grid>
        </Grid>
        <Skeleton variant="text" sx={{ fontSize: "2rem", width: "80%" }} />
      </CardContent>
    </Card>
  );
};

export default GameDetails;
