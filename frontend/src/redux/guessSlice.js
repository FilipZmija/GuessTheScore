import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guess: { home: "", away: "" },
  guessId: null,
  points: null,
  currentPoints: null,
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
      state.points = action.payload.points;
      state.currentPoints = action.payload.currentPoints;
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
    resetData: (state) => {
      state.guess = { home: "", away: "" };
      state.guessId = null;
      state.points = null;
      state.currentPoints = null;
      state.selectedGame = null;
      state.popularGuesses = null;
      state.isClicked = null;
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
  setCurrentPoints,
  resetData,
} = guessSlice.actions;
export default guessSlice.reducer;
