import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ReaderState = {
  fontSize: number;
};

const initialState: ReaderState = {
  fontSize: 18,
};

const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {
    setFontSize(state, action: PayloadAction<number>) {
      state.fontSize = action.payload;
    },
  },
});

export const { setFontSize } = readerSlice.actions;

export default readerSlice.reducer;