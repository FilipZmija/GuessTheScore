import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./loginSlice";

export default configureStore({
  reducer: { auth: authSlice },
});
