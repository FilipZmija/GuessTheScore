import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GuessSkeleton from "./GuessSkeleton";
import GameGuess from "./GameGuess";
import axios from "axios";

export default function GuessContainer() {
  const [guess, setGuess] = useState({ home: "", away: "" });
  const [guessId, setGuessId] = useState(null);
  const [points, setPoints] = useState(undefined);
  const [selectedGame, setSelectedGame] = useState(false);
  const [popularGuesses, setPopularGuesses] = useState();
  const event = useSelector((state) => state.events.selectedGameInfo);
  const token = useSelector((state) => state.auth.token);
  const scoreboardId = useSelector((state) => state.scoreboard.scoreboardId);
  const eventId = event?.id;

  useEffect(() => {
    setSelectedGame();
    setPoints();
    setGuessId();
    setGuess({ home: "", away: "" });
  }, [event]);

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
        setPopularGuesses(popularGuesses.data?.PopularGuesses);
      })();
  }, [scoreboardId, eventId]);

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
          setSelectedGame(response.data.event);
          const [home, away] = userGuess
            ? userGuess?.score.split(":")
            : ["", ""];
          setPoints(userGuess.points);

          setGuessId(userGuess?.id || null);
          setGuess({
            home: home,
            away: away,
          });
        } catch (e) {
          console.error(e);
        }
      })();
  }, [eventId, token, setSelectedGame, setPoints, setGuessId, setGuess]);

  return (
    <>
      {selectedGame ? (
        <GameGuess
          selectedGame={selectedGame}
          points={points}
          guess={guess}
          guessId={guessId}
          setGuessId={setGuessId}
          setGuess={setGuess}
          setSelectedGame={setSelectedGame}
          popularGuesses={popularGuesses}
        />
      ) : (
        <GuessSkeleton />
      )}
    </>
  );
}
