import React from "react";
import "./Auth.css";
import { Login } from "./Login";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

export default function Auth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        const userData = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/profile`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        const { username } = userData;
        dispatch(login({ username, token }));
      })();
    }
  }, []);

  return (
    <div className="auth-container">
      <Login />
    </div>
  );
}
