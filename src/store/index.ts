import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import offersReducer from "./offers-slice";
import { AnyAction } from "redux";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    offers: offersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  void,
  void,
  AnyAction
>;
export default store;
