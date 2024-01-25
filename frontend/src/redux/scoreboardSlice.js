import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scoreboardId: null,
  code: null,
};

export const scoreboardSlice = createSlice({
  name: "scoreboard",
  initialState: initialState,
  reducers: {
    setScoreboardId: (state, action) => {
      state.scoreboardId = action.payload;
    },
    setScoreboardCode: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { setScoreboardId, setScoreboardCode } = scoreboardSlice.actions;
export default scoreboardSlice.reducer;
