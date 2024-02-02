import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Switch,
} from "@mui/material";
import axios from "axios";

export default function FormDialog({ setReload }) {
  const [open, setOpen] = useState(false);
  const [leagueCode, setLeagueCode] = useState();
  const [checked, setChecked] = useState();
  const [switched, setSwitched] = useState();
  const token = useSelector((state) => state.auth.token);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const competitions = "2021,2001,2002,2003,2014,2015,2018,2019".split(",");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setLeagueCode(), 100);
  };
  const handleCheck = (comp) => {
    setChecked((prev) => {
      return { ...prev, [comp]: !prev[comp] };
    });
  };

  useEffect(() => {
    setChecked(() => {
      const obj = {};
      competitions.map((name) => Object.assign(obj, { [name]: true }));
      return obj;
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name;
    const array = [];
    for (const [key, value] of Object.entries(checked)) {
      if (value) array.push(key);
    }

    console.log(name, array, switched);
    (async () => {
      try {
        const league = await axios.post(
          `${process.env.REACT_APP_API_URL}/scoreboards/create`,
          {
            name,
            competitions: array,
            calculateBack: switched,
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
          fontWeight: "bold",
        }}
      >
        {isMobile ? "Create" : "Create league"}
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
            <DialogTitle sx={{ fontWeight: "bold" }}>Create league</DialogTitle>
            <DialogContent sx={{ maxWidth: "20rem" }}>
              <DialogContentText>
                Please enter your league name and choose settings.
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
                sx={{ marginBottom: "15px" }}
              />
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                Leagues to include:
              </Typography>
              {checked && (
                <Box>
                  {competitions.map((comp) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked[comp]}
                          onChange={() => handleCheck(comp)}
                        />
                      }
                      label={comp}
                    />
                  ))}
                </Box>
              )}
              <FormControlLabel
                control={
                  <Switch onChange={(e) => setSwitched(e.target.checked)} />
                }
                label="Include previous points?"
                sx={{ fontWeight: "bold" }}
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
