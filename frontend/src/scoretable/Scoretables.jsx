import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import Slides from "./Slides";
function Scoretables() {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "100%",
          padding: "1.25rem",
          backgroundColor: "#EEE7DA",
          borderRadius: "10px",
          border: "1px solid rgba(0, 0, 0, 0.12)",
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
          <Button
            variant="outlined"
            color="primary"
            sx={{
              margin: "0 0.2rem",
              fontSize: { xs: "0.8rem", md: "0.9rem" },
            }}
          >
            Join league
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              margin: "0 0.2rem",
              fontSize: { xs: "0.8rem", md: "0.9rem" },
            }}
          >
            Create leagues
          </Button>
        </Box>
        <Slides />
      </TableContainer>
    </>
  );
}
export default Scoretables;
