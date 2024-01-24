import * as React from "react";
import { useState } from "react";
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
  const [leagueCode, setLeagueCode] = useState();
  const token = useSelector((state) => state.auth.token);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setLeagueCode(), 100);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name;

    (async () => {
      try {
        const league = await axios.post(
          `${process.env.REACT_APP_API_URL}/scoreboards/create`,
          {
            name,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setLeagueCode(league.data.hash);
        setReload((prev) => !prev);
      } catch (e) {
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
        }}
      >
        Create league
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        {leagueCode ? (
          <>
            <DialogTitle>Create league</DialogTitle>
            <DialogContent sx={{ maxWidth: "20rem" }}>
              <DialogContentText>
                You hava created a league succesfully. Share this code with your
                friends so they can join: {leagueCode}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Create league</DialogTitle>
            <DialogContent sx={{ maxWidth: "20rem" }}>
              <DialogContentText>
                Please enter your league name.
              </DialogContentText>
              <TextField
                autoFocus
                required
                name="name"
                margin="dense"
                id="name"
                label="League name"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
}
