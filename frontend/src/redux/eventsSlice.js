import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mobileOpen: false,
  gameList: undefined,
  dateIndex: 0,
  selection: 0,
  selectedGameInfo: undefined,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    openDrawer: (state) => {
      state.mobileOpen = !state.mobileOpen;
    },
    updateGames: (state, action) => {
      state.gameList = action.payload;
      state.selectedGameInfo = state.gameList[state.selection];
    },
    incrementIndex: (state) => {
      state.dateIndex++;
    },
    decrementIndex: (state) => {
      state.dateIndex--;
    },
    resetSelections: (state) => {
      state.selection = 0;
    },
    selectEvent: (state, action) => {
      state.selection = action.payload;
      state.selectedGameInfo = state.gameList[state.selection];
    },
  },
});

export const {
  openDrawer,
  updateGames,
  incrementIndex,
  decrementIndex,
  selectEvent,
  resetSelections,
} = eventsSlice.actions;
export default eventsSlice.reducer;
