import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  open: false,
};

export const errorSlice = createSlice({
  name: "error",
  initialState: initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setMessage, setOpen } = errorSlice.actions;
export default errorSlice.reducer;
