import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleSide: false,
  error: null,
  isLoading: false,
  isLoggedIn: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeVisSide: (state, action) => {
      state.visibleSide = !state.visibleSide;
    },
    showError: (state, action) => {
      state.error = action.payload;
    },
    loading: (state) => {
      state.isLoading = !state.isLoading;
    },
    loggingInOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { changeVisSide, showError, loading } = uiSlice.actions;
export default uiSlice.reducer;
