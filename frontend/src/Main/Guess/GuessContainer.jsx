import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GuessSkeleton from "./GuessSkeleton";
import GameGuess from "./GameGuess";
import axios from "axios";
import {
  guessScore,
  setGuessId,
  setPoints,
  setPopularGuesses,
  setSelectedGame,
  setIsClicked,
} from "../../redux/guessSlice";

export default function GuessContainer() {
  const event = useSelector((state) => state.events.selectedGameInfo);
  const token = useSelector((state) => state.auth.token);
  const scoreboardId = useSelector((state) => state.scoreboard.scoreboardId);
  const { selectedGame } = useSelector((state) => state.guess);
  const dispatch = useDispatch();
  const eventId = event?.id;

  useEffect(() => {
    dispatch(setSelectedGame());
    dispatch(setPoints());
    dispatch(setPopularGuesses());
    dispatch(setGuessId());
    dispatch(setIsClicked());
    dispatch(guessScore({ home: "", away: "" }));
  }, [event, dispatch]);

  useEffect(() => {
    scoreboardId &&
      eventId &&
      (async () => {
        console.log(scoreboardId, eventId);
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
        console.log(popularGuesses.data?.PopularGuesses);
        dispatch(setPopularGuesses(popularGuesses.data?.PopularGuesses));
      })();
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
          dispatch(setPoints(userGuess.points));

          dispatch(setGuessId(userGuess?.id || null));
          dispatch(
            guessScore({
              home: home,
              away: away,
            })
          );
        } catch (e) {
          console.error(e);
        }
      })();
  }, [eventId, token, dispatch]);
  return <>{selectedGame ? <GameGuess /> : <GuessSkeleton />}</>;
}
