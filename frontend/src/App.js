import React from "react";
import { useSelector } from "react-redux";
import Auth from "./Auth/Auth";
import GuessApp from "./Main/GuessApp";
const App = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  return <>{localStorage.getItem("token") ? <GuessApp /> : <Auth />}</>;
};

export default App;
