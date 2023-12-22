import React from "react";
import { useState, useEffect } from "react";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const formContainerStyle = {
  maxWidth: "400px",
  minWidth: "350px",
  margin: "auto",
  marginTop: "50px",
  textAlign: "center",
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
      console.log(userData);
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
    <Container sx={formContainerStyle}>
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          color: "#4F6F52",
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
            <form onSubmit={handleSubmit}>
              <TextField
                required
                label="Username"
                variant="outlined"
                sx={{
                  marginTop: "10px",
                  ...textFieldStyle,
                }}
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
                error={credentails.password !== credentails.confirmedPassword}
              />
              <Button
                type="submit"
                variant="contained"
                sx={buttonStyle}
                disabled={
                  credentails.password !== credentails.confirmedPassword
                }
              >
                Register
              </Button>
              <Button
                type="submit"
                variant="text"
                sx={secndaryButtonStyle}
                href="/"
              >
                I already have an account
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Register;
