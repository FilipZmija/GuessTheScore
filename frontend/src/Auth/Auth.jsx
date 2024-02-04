import React from "react";
import "./Auth.css";
import { Login } from "./Login";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { setOpen } from "../redux/errorSlice";
export default function Auth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        (async () => {
          const userData = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/profile`,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
          const { username, id } = userData.data?.users[0];
          dispatch(login({ username, id, token }));
        })();
      } catch (e) {
        dispatch(setOpen(true));
        console.error(e);
      }
    }
  }, [dispatch]);

  return (
    <>
      <Login />
    </>
  );
}
