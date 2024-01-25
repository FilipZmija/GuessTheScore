import React, { useEffect } from "react";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const alertStyle = {
  width: { xs: "80%", md: "25%", lg: "20%" },
  position: "absolute",
};
export default function SucessAlert({ alertOpen, setAlertOpen }) {
  useEffect(() => {
    setTimeout(() => setAlertOpen(false), 5000);
  }, [setAlertOpen]);

  return (
    <Box sx={alertStyle}>
      <Collapse in={alertOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
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
