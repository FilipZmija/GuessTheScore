import React from "react";
import { useEffect, useState } from "react";
import GameList from "./GameList";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Grid } from "@mui/material";
import { getDate } from "../functions/date";
import {
  incrementIndex,
  decrementIndex,
  updateGames,
} from "../redux/eventsSlice";

const filters = [];

export default function GameListSwitcher() {
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  const dateIndex = useSelector((state) => state.events.dateIndex);
  const token = useSelector((state) => state.auth.token);
  const games = useSelector((state) => state.events.gameList);
  const increment = () => {
    dispatch(incrementIndex());
  };
  const decrement = () => {
    dispatch(decrementIndex());
  };

  useEffect(() => setDate(getDate(dateIndex)), [dateIndex]);
  console.log(games);
  const buttonsContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "80px",
    backgroundColor: "#faf8f5",
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "5px",
  };

  const switchContainer = {};

  useEffect(() => {
    try {
      const getGames = async (filters, date) => {
        const gamesList = await axios.get(
          `${process.env.REACT_APP_API_URL}/event/all`,
          filters.length > 0
            ? {
                headers: {
                  Authorization: "Bearer " + token,
                },
                params: { filterBy: `${filters.join(",")}`, date: date },
              }
            : {
                headers: {
                  Authorization: "Bearer " + token,
                },
                params: { date: date },
              }
        );
        const games =
          filters.length > 0
            ? filters.map((filter, index) => {
                return { [filter]: gamesList[index] };
              })
            : gamesList;
        dispatch(
          updateGames(filters.length > 0 ? gamesList.data[0] : gamesList.data)
        );
      };
      date && getGames(filters, date);
    } catch (e) {
      console.error(e);
    }
  }, [date, token, filters]);

  return (
    <>
      <Box sx={switchContainer}>
        <Box
          sx={{
            ...buttonsContainer,
          }}
        >
          <Button onClick={decrement}>Prev</Button>
          {date}
          <Button onClick={increment}>Next</Button>
        </Box>
        {games && <GameList games={games} />}
      </Box>
    </>
  );
}
