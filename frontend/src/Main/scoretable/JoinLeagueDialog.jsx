import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

export default function FormDialog({ setReload }) {
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setMessage(), 100);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const code = formJson.code;
    (async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/scoreboards/assign`,
          {
            hash: code,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setMessage("You have successfully join a league!");
        setReload((prev) => !prev);
      } catch (e) {
        setMessage("Sorry, league with this code does not exist...");
        console.error(e);
      }
    })();
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="primary"
        sx={{
          margin: "0 0.2rem",
          fontSize: { xs: "0.8rem", md: "0.9rem" },
          fontWeight: "bold",
        }}
      >
        Join league
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Join league</DialogTitle>

        {message ? (
          <>
            <DialogContent sx={{ maxWidth: "20rem" }}>
              <DialogContentText>{message}</DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent sx={{ maxWidth: "20rem" }}>
              <DialogContentText>Please, enter league code.</DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="code"
                name="code"
                label="League code"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Join</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
}
