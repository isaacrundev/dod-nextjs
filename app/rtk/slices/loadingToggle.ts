import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = false;

const loadingToggle = createSlice({
  name: "foodData",
  initialState,
  reducers: {
    toTrue: (state) => true,
    toFalse: (state) => false,
  },
});

export const { toTrue, toFalse } = loadingToggle.actions;

export default loadingToggle.reducer;
