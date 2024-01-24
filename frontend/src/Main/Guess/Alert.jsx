import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export default function SucessAlert({ open, setOpen }) {
  useEffect(() => {
    setTimeout(() => setOpen(false), 5000);
  }, [setOpen]);
  return (
    <Box
      sx={{ width: { xs: "80%", md: "25%", lg: "15%" }, position: "absolute" }}
    >
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Guess was succesfully saved!
        </Alert>
      </Collapse>
    </Box>
  );
}
