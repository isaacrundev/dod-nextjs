import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = false;

const loadingState = createSlice({
  name: "loadingState",
  initialState,
  reducers: {
    toTrue: (state) => true,
    toFalse: (state) => false,
  },
});

export const { toTrue, toFalse } = loadingState.actions;

export default loadingState.reducer;
