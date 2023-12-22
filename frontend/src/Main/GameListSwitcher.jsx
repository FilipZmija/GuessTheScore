import React from "react";
import { useEffect, useState } from "react";
import GameList from "./GameList";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Button, Grid } from "@mui/material";
import { getDate } from "../functions/date";

const filters = [];

export default function GameListSwitcher() {
  const [games, setGames] = useState();
  const [dateIndex, setDateIndex] = useState(0);
  const [date, setDate] = useState(getDate(0));
  const token = useSelector((state) => state.auth.token);
  const increment = () => {
    setDateIndex((prev) => ++prev);
    console.log(date);
  };
  const decrement = () => {
    setDateIndex((prev) => --prev);
  };

  useEffect(() => setDate(getDate(dateIndex)), [dateIndex]);

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
        setGames(filters.length > 0 ? gamesList.data[0] : gamesList.data);
      };
      getGames(filters, date);
    } catch (e) {
      console.error(e);
    }
  }, [date, token, filters]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button onClick={decrement}>Prev</Button>
        {date}
        <Button onClick={increment}>Next</Button>
      </Box>
      {games && <GameList games={games} />}
    </>
  );
}
