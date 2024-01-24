import React, { useEffect } from "react";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const alertStyle = {
  width: { xs: "80%", md: "25%", lg: "15%" },
  position: "absolute",
};
export default function SucessAlert({ open, setOpen }) {
  useEffect(() => {
    setTimeout(() => setOpen(false), 5000);
  }, [setOpen]);

  return (
    <Box sx={alertStyle}>
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
