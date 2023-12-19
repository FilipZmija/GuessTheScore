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
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
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

const Login = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const status = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        { username: username, password: password }
      );
      localStorage.setItem("token", status.data.accessToken);
      dispatch(login({ username, token: status.data.accessToken }));
    } catch (e) {
      console.log(e);
      setMessage(e.response.data.message);
    }
  };

  return (
    <Container sx={formContainerStyle} maxWidth="false">
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          color: "#4F6F52",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Typography variant="h7">{message}</Typography>
        <Box sx={{ mt: "8px" }}>
          <form onSubmit={(e) => handleLogin(e)}>
            <TextField
              label="Username"
              variant="outlined"
              sx={textFieldStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              sx={textFieldStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" sx={buttonStyle}>
              Login
            </Button>
          </form>
          <Button
            type="submit"
            variant="text"
            sx={secndaryButtonStyle}
            href="auth/register"
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export { Login };
