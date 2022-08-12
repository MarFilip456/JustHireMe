import { createSlice } from '@reduxjs/toolkit';

export type devType = {
    name: string;
    surname: string;
    logo: string;
    email: string;
    experience: string;
    mainLang: string;
    location: string;
    aboutYou: string;
    gitHub: string;
    linkedIn: string;
    id: string;
    key: string;
  };

interface initialDevsStateType {
  devs: devType[];
}

const initialState: initialDevsStateType = {
  devs: []
};

const filteredDevsSlice = createSlice({
  name: 'devs',
  initialState,
  reducers: {
    setDevs: (state, action) => {
      state.devs = action.payload;
    }
  }
});

export const devsActions = filteredDevsSlice.actions;
export default filteredDevsSlice.reducer;