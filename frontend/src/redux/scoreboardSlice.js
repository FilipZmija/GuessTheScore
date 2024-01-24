import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scoreboardId: null,
};

export const scoreboardSlice = createSlice({
  name: "scoreboard",
  initialState: initialState,
  reducers: {
    setScoreboardId: (state, action) => {
      state.scoreboardId = action.payload;
    },
  },
});

export const { setScoreboardId } = scoreboardSlice.actions;
export default scoreboardSlice.reducer;
