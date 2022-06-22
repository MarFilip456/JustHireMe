import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleSide: false,
  visibleDescr: false,
};

const toggleVisibilitySlice = createSlice({
  name: "toggleVis",
  initialState,
  reducers: {
    changeVisSide: (state) => {
      state.visibleSide = !state.visibleSide;
    },
    changeVisDescr: (state) => {
      state.visibleDescr = !state.visibleDescr;
    },
  },
});

export const { changeVisSide, changeVisDescr } = toggleVisibilitySlice.actions;
export default toggleVisibilitySlice.reducer;
