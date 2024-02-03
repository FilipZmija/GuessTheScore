import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../../redux/errorSlice";
import GuessSkeleton from "./GuessSkeleton";
import GameGuess from "./GameGuess";
import GameOverview from "./GameOverview";
import axios from "axios";
import {
  guessScore,
  setGuessId,
  setPoints,
  setPopularGuesses,
  setSelectedGame,
  resetData,
} from "../../redux/guessSlice";

export default function GuessContainer() {
  const event = useSelector((state) => state.events.selectedGameInfo);
  const token = useSelector((state) => state.auth.token);
  const scoreboardId = useSelector((state) => state.scoreboard.scoreboardId);
  const { selectedGame } = useSelector((state) => state.guess);
  const dispatch = useDispatch();
  const eventId = event?.id;

  useEffect(() => {
    dispatch(resetData());
  }, [event, dispatch]);

  useEffect(() => {
    try {
      scoreboardId &&
        eventId &&
        (async () => {
          const popularGuesses = await axios.get(
            `${process.env.REACT_APP_API_URL}/scoreboards/popular/${scoreboardId}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
              params: {
                EventId: eventId,
              },
            }
          );
          dispatch(setPopularGuesses(popularGuesses.data));
        })();
    } catch (e) {
      dispatch(setOpen(true));
      console.error(e);
    }
  }, [scoreboardId, eventId, dispatch, token]);

  useEffect(() => {
    eventId &&
      (async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/event/guesses/${eventId}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          const userGuess = response.data?.event.Guesses[0];
          dispatch(setSelectedGame(response.data.event));
          const [home, away] = userGuess
            ? userGuess?.score.split(":")
            : ["", ""];
          dispatch(
            setPoints({
              currentPoints: userGuess?.currentPoints,
              points: userGuess?.points,
            })
          );
          dispatch(setGuessId(userGuess?.id || null));
          dispatch(
            guessScore({
              home: home,
              away: away,
            })
          );
        } catch (e) {
          dispatch(setOpen(true));
          console.error(e);
        }
      })();
  }, [eventId, token, dispatch]);
  return (
    <>
      {selectedGame ? (
        selectedGame.status !== "TIMED" ? (
          <GameOverview />
        ) : (
          <GameGuess />
        )
      ) : (
        <GuessSkeleton />
      )}
    </>
  );
}
