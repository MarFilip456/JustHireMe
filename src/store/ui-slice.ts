import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface initialUiStateType {
  visibleSide: boolean;
  visiblePopup: boolean;
  isLoading: boolean;
  isError: boolean;
  isLoggedIn: boolean;
};

const initialState: initialUiStateType = {
  visibleSide: false,
  visiblePopup: false,
  isLoading: false,
  isError: false,
  isLoggedIn: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeVisSide: (state) => {
      state.visibleSide = !state.visibleSide;
    },
    changeVisPopup: (state) => {
      state.visiblePopup = !state.visiblePopup;
    },
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setError: (state) => {
      state.isError = !state.isError;
    },
    loggingInOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiState = (state: RootState) => state.ui;
export default uiSlice.reducer;
