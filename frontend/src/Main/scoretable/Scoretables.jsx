import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import Slides from "./Slides";
import JoinLeagueDialog from "./JoinLeagueDialog";
import CreateLeagueDialog from "./CreateLeagueDialog";
import CopyButton from "./CopyButton";
const outterButtonContainer = {
  width: "100%",
  borderRadius: "10px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  padding: "1.25rem",
  backgroundColor: "#EEE7DA",
};
const innerButtonContainer = {
  display: "flex",
  justifyContent: "center",
  wordSpacing: "10",
  marginBottom: "1rem",
};
function Scoretables() {
  const [reload, setReload] = useState(false);
  const scoreboardId = useSelector((state) => state.scoreboard.scoreboardId);
  return (
    <>
      <Box sx={outterButtonContainer}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} sx={innerButtonContainer}>
            <JoinLeagueDialog setReload={setReload} />
            <CreateLeagueDialog setReload={setReload} />
          </Grid>
          <Grid item xs={1}>
            {scoreboardId !== 1 && <CopyButton />}
          </Grid>
        </Grid>
        <Slides reload={reload} />
      </Box>
    </>
  );
}
export default Scoretables;
