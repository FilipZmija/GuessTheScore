import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.username = "";
      state.token = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
