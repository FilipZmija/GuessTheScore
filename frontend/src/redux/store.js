import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import eventsSlice from "./eventsSlice";
import scoreboardSlice from "./scoreboardSlice";
import guessSlice from "./guessSlice";
import errorSlice from "./errorSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    events: eventsSlice,
    scoreboard: scoreboardSlice,
    guess: guessSlice,
    error: errorSlice,
  },
});
