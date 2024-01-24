import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import Slides from "./Slides";
import JoinLeagueDialog from "./JoinLeagueDialog";
import CreateLeagueDialog from "./CreateLeagueDialog";

function Scoretables() {
  const [reload, setReload] = useState(false);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: "10px",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          padding: "1.25rem",
          backgroundColor: "#EEE7DA",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            wordSpacing: "10",
            marginBottom: "1rem",
          }}
        >
          <JoinLeagueDialog setReload={setReload} />
          <CreateLeagueDialog setReload={setReload} />
        </Box>
        <Slides reload={reload} />
      </Box>
    </>
  );
}
export default Scoretables;
