import { Record } from "@/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Record[] = [];

const records = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<Record[]>) => {
      return (state = action.payload);
    },
    initialize: (state) => {
      state = initialState;
    },
  },
});

export const { setRecords, initialize } = records.actions;

export default records.reducer;
