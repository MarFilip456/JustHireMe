import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface notificationStateType {
  status: string;
  title: string;
  message: string;
}

interface initialUiStateType {
  visibleSide: boolean;
  visiblePopup: boolean;
  notification: notificationStateType;
  isLoading: boolean;
  isError: boolean;
  isLoggedIn: boolean;
};

const initialState: initialUiStateType = {
  visibleSide: false,
  visiblePopup: false,
  notification: {
    status: "",
    title: "",
    message: "",
  },
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
    showNotification: (state, action: PayloadAction<notificationStateType> ) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      }
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
