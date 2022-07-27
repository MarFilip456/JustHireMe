import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface initialUiStateType {
  visibleSide: boolean;
  visiblePopup: boolean;
  isLoading: boolean;
  isError: boolean;
  isLoggedIn: boolean;
  isDev: boolean;
}
let initialState: initialUiStateType;
const isTokenInStorage = localStorage.getItem("justHireMeLogin");
const isDevStorage = localStorage.getItem("justHireMeDev");
const expirationDate = localStorage.getItem("justHireMeDate");
let isTimeLeft = false;
if (expirationDate) {
  isTimeLeft =
    new Date(expirationDate).getTime() - new Date().getTime() > 300000;
}

if (isTokenInStorage && isTimeLeft && isDevStorage) {
  initialState = {
    visibleSide: false,
    visiblePopup: false,
    isLoading: false,
    isError: false,
    isLoggedIn: true,
    isDev: true,
  };
} else if (isTokenInStorage && isTimeLeft) {
  initialState = {
    visibleSide: false,
    visiblePopup: false,
    isLoading: false,
    isError: false,
    isLoggedIn: true,
    isDev: false,
  };
} else {
  initialState = {
    visibleSide: false,
    visiblePopup: false,
    isLoading: false,
    isError: false,
    isLoggedIn: false,
    isDev: false,
  };
}

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
    setIsDev: (state) => {
      state.isDev = !state.isDev;
    }
  },
});

export const uiActions = uiSlice.actions;
export const uiState = (state: RootState) => state.ui;
export default uiSlice.reducer;
