import React from "react";
import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";

const formContainerStyle = {
  maxWidth: "400px",
  minWidth: "350px",
  margin: "auto",
  textAlign: "center",
  marginTop: "20vh",
};

const textFieldStyle = {
  marginBottom: "20px",
  width: "100%",
  color: "#739072",
};

const buttonStyle = {
  margin: "3px",
  backgroundColor: "#739072",
  color: "#ECE3CE",
  "&:hover": {
    backgroundColor: "#4F6F52",
  },
};

const secndaryButtonStyle = {
  margin: "3px",
  "&:hover": {
    backgroundColor: "rgb(236, 227, 206, 0.4)",
  },
};

const Register = () => {
  const [credentails, setCredentials] = useState({
    username: "",
    password: "",
    confirmedPassword: "",
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const userData = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        { username: credentails.username, password: credentails.password }
      );
      setSuccess(true);
    } catch (e) {
      console.error(e);
      setError(
        e.response.data.errors
          .map((item) => item.message[0].toUpperCase() + item.message.slice(1))
          .join(", ")
      );
    }
  };
  return (
    <>
      <CssBaseline />
      <Container sx={formContainerStyle} maxWidth="false">
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            color: "#4F6F52",
            backgroundColor: "#faf8f5",
          }}
        >
          {success ? (
            <>
              <Typography variant="h4">User registered succesfully!</Typography>
              <Button type="submit" variant="text" sx={buttonStyle} href="/">
                Click to log in
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h4">Register</Typography>
              <Typography variant="h7" sx={{ color: "rgb(230, 0, 0)" }}>
                {error}
              </Typography>
              <Box sx={{ mt: "8px" }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    required
                    label="Username"
                    variant="outlined"
                    sx={textFieldStyle}
                    error={
                      credentails.username &&
                      (credentails.username.length > 12 ||
                        credentails.username.length < 4)
                    }
                    helperText={
                      credentails.username &&
                      (credentails.username.length > 12 ||
                        credentails.username.length < 4)
                        ? "Username must be 4-12 characters"
                        : ""
                    }
                    onChange={(e) =>
                      setCredentials((prev) => {
                        return { ...prev, username: e.target.value };
                      })
                    }
                  />
                  <TextField
                    required
                    label="Password"
                    type="password"
                    variant="outlined"
                    sx={textFieldStyle}
                    onChange={(e) =>
                      setCredentials((prev) => {
                        return { ...prev, password: e.target.value };
                      })
                    }
                    error={
                      credentails.password &&
                      (credentails.password.length > 12 ||
                        credentails.password.length < 4)
                    }
                    helperText={
                      credentails.password &&
                      (credentails.password.length > 12 ||
                        credentails.password.length < 4)
                        ? "Password must be at least 4 characters"
                        : ""
                    }
                  />
                  <TextField
                    required
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    sx={textFieldStyle}
                    onChange={(e) =>
                      setCredentials((prev) => {
                        return { ...prev, confirmedPassword: e.target.value };
                      })
                    }
                    error={
                      credentails.password !== credentails.confirmedPassword
                    }
                    helperText={
                      credentails.password !== credentails.confirmedPassword
                        ? "Passwords do not match"
                        : ""
                    }
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={buttonStyle}
                    disabled={
                      credentails.password !== credentails.confirmedPassword ||
                      credentails.username.length > 12 ||
                      credentails.username.length < 4
                    }
                  >
                    Register
                  </Button>
                </form>
                <Button
                  type="submit"
                  variant="text"
                  sx={secndaryButtonStyle}
                  href="/"
                >
                  I already have an account
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Register;
