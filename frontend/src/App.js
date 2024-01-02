import React from "react";
import { useSelector } from "react-redux";
import Auth from "./Auth/Auth";
import GuessApp from "./Main/GuessApp";
import NavBar from "./NavBar";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBar />
      </Box>
      {token ? <GuessApp /> : <Auth />}
    </>
  );
};

export default App;
