import { createSlice } from "@reduxjs/toolkit";

const hamburgerSlice = createSlice({
  name: "hamburger",
  initilState: {
      id: '',
      key: '',
    visible: false,
  },
  reducers: {
    hamburgerToggleReducer(state, action) {
        state.id = 'action.payload.id';
        state.key = state.id;
        state.visible = !state.visible;
    },
  },
});

export const { hamburgerToggleReducer } = hamburgerSlice.actions;
export default hamburgerSlice.reducer;
