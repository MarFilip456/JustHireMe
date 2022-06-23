import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleSide: false,
  notification: {
    status: "",
    title: "",
    message: ""
  },
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
      };
    },
    loggingInOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { changeVisSide, showNotification } = uiSlice.actions;
export default uiSlice.reducer;
