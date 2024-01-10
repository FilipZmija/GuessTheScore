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
          maxWidth: 650,
          padding: "20px",
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
            marginBottom: "15px",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{
              margin: "0 0.2rem",
              fontSize: { xs: "12px", md: "14px" },
            }}
          >
            Join league
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              margin: "0 0.2rem",
              fontSize: { xs: "12px", md: "14px" },
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
