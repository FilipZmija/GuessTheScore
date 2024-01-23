import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guess: { home: "", away: "" },
  guessId: null,
  points: null,
  selectedGame: null,
  popularGuesses: null,
  isClicked: null,
};

export const guessSlice = createSlice({
  name: "guess",
  initialState: initialState,
  reducers: {
    guessScore: (state, action) => {
      state.guess.home = action.payload.home;
      state.guess.away = action.payload.away;
    },
    setGuessId: (state, action) => {
      state.guessId = action.payload;
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setSelectedGame: (state, action) => {
      state.selectedGame = action.payload;
    },
    setPopularGuesses: (state, action) => {
      state.popularGuesses = action.payload;
    },
    setIsClicked: (state, action) => {
      state.isClicked = action.payload;
    },
  },
});

export const {
  guessScore,
  setGuessId,
  setPoints,
  setPopularGuesses,
  setSelectedGame,
  setIsClicked,
} = guessSlice.actions;
export default guessSlice.reducer;
