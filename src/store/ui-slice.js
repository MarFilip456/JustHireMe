import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleSide: false,
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
    showNotification: (state, action) => {
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
export default uiSlice.reducer;
