import { configureStore } from "@reduxjs/toolkit";
import toggleVisReducer from "./toggleVisibilitySlice";

const store = configureStore({
  reducer: {
    toggle: toggleVisReducer,
  },
});

export default store;
