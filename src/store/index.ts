import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import offersReducer from "./offers-slice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    offers: offersReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;