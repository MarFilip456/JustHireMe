import { configureStore } from "@reduxjs/toolkit";

import hamburgerToggleReducer from "./hamburgerToggleSlice";

/* const hamburgerToggleReducer = (state = { visible: false }, action) => {
  if (action.type === "toggle") {
    return {
      visible: true,
    };
  }
}; */

const store = configureStore({
  reducer: hamburgerToggleReducer,
});

export default store;
