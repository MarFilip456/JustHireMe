import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import offersReducer from "./offers-slice";
import devsReducer from "./filteredDevs-slice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    offers: offersReducer,
    devs: devsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
