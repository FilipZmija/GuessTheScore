import React from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";

const Register = () => {
  const formContainerStyle = {
    maxWidth: "400px",
    margin: "auto",
    marginTop: "50px",
  };

  const textFieldStyle = {
    marginBottom: "20px",
    width: "100%",
  };

  const buttonStyle = {
    backgroundColor: "#739072",
    color: "#ECE3CE",
    "&:hover": {
      backgroundColor: "#4F6F52",
    },
  };

  return (
    <Container sx={formContainerStyle}>
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <TextField label="Username" variant="outlined" sx={textFieldStyle} />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          sx={textFieldStyle}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          sx={textFieldStyle}
        />
        <Button variant="contained" sx={buttonStyle}>
          Register
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
