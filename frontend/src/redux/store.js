import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import eventsSlice from "./eventsSlice";

export default configureStore({
  reducer: { auth: authSlice, events: eventsSlice },
});
