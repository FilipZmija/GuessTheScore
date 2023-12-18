import React from "react";
import { useSelector } from "react-redux";
import Auth from "./Auth/Auth";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  return <>{localStorage.getItem("token") ? "you are logged in" : <Auth />}</>;
};

export default App;
