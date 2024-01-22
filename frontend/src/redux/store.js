import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import eventsSlice from "./eventsSlice";
import scoreboardSlice from "./scoreboardSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    events: eventsSlice,
    scoreboard: scoreboardSlice,
  },
});
