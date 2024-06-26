import React from "react";
import { useEffect, useState } from "react";
import GameList from "./GameList";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { getDate } from "../functions/date";
import {
  incrementIndex,
  decrementIndex,
  updateGames,
  resetSelections,
} from "../redux/eventsSlice";
import { setOpen } from "../redux/errorSlice";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/system";

const filters = [];

const buttonsContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px",
  backgroundColor: "#faf8f5",
  width: "60%",
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: "5px",
};

const switchContainer = { overflow: "auto" };

const noGameContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "35vh",
};

export default function GameListSwitcher() {
  const [dates, setDates] = useState({
    firstDate: undefined,
    lastDate: undefined,
  });

  const dispatch = useDispatch();
  const dateIndex = useSelector((state) => state.events.dateIndex);
  const token = useSelector((state) => state.auth.token);
  const games = useSelector((state) => state.events.gameList);
  const date = getDate(dateIndex);
  const increment = () => {
    dispatch(incrementIndex());
  };
  const decrement = () => {
    dispatch(decrementIndex());
  };

  useEffect(() => {
    try {
      (async () => {
        const gamesList = await axios.get(
          `${process.env.REACT_APP_API_URL}/event/dates`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setDates(gamesList.data);
      })();
    } catch (e) {
      dispatch(setOpen(true));
      console.error(e);
    }
  }, [dispatch, token, setDates]);

  useEffect(() => {
    try {
      date &&
        (async () => {
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
          dispatch(resetSelections(0));
          dispatch(
            updateGames(filters.length > 0 ? gamesList.data[0] : gamesList.data)
          );
        })();
    } catch (e) {
      console.error(e);
      dispatch(setOpen(true));
    }
  }, [date, token, dispatch]);
  return (
    <>
      <Toolbar />
      <Box sx={switchContainer}>
        <Box sx={buttonsContainer}>
          <Button onClick={decrement} disabled={date === dates.firstDate}>
            Prev
          </Button>
          {date}
          <Button onClick={increment} disabled={date === dates.lastDate}>
            Next
          </Button>
        </Box>
        {games?.length ? (
          <GameList games={games} />
        ) : (
          <>
            <Container sx={noGameContainer}>
              <Typography variant="h4">No games on this date</Typography>
            </Container>
          </>
        )}
      </Box>
    </>
  );
}
