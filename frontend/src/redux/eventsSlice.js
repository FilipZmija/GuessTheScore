import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mobileOpen: false,
  gameList: undefined,
  dateIndex: 0,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    openDrawer: (state) => {
      console.log(state);
      state.mobileOpen = !state.mobileOpen;
    },
    updateGames: (state, action) => {
      console.log(action);
      state.gameList = action.payload;
    },
    incrementIndex: (state) => {
      state.dateIndex++;
    },
    decrementIndex: (state) => {
      state.dateIndex--;
    },
  },
});

export const { openDrawer, updateGames, incrementIndex, decrementIndex } =
  eventsSlice.actions;
export default eventsSlice.reducer;
