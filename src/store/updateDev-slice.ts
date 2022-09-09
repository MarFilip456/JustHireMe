import { createSlice } from '@reduxjs/toolkit';

export type devType = {
    name?: string;
    surname?: string;
    logoUrl?: string;
    email?: string;
    experience?: string;
    mainLang?: string;
    location?: string;
    aboutYou?: string;
    gitHubUrl?: string;
    linkedInUrl?: string;
    id?: string;
    key?: string;
  };

interface initialDevsStateType {
  dev: devType;
}

const initialState: initialDevsStateType = {
  dev: {}
};

const updateDevSlice = createSlice({
  name: 'dev',
  initialState,
  reducers: {
    updateDev: (state, action) => {
      state.dev = action.payload;
    }
  }
});

export const devActions = updateDevSlice.actions;
export default updateDevSlice.reducer;