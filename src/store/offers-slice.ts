import { createSlice } from "@reduxjs/toolkit";

export type offerObject = {
  companyName: string;
  description: string;
  aboutUs: string;
  companySize: string;
  expLevel: string;
  requirements: string;
  id: string;
  jobPosition: string;
  key: string;
  location: string;
  logo: string;
  maxSalary: string;
  minSalary: string;
  techStack: { desc: string; lang: string; value: number }[];
};

interface initialOffersStateType {
  offers: offerObject[];
}

const initialState: initialOffersStateType = {
  offers: [],
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setOffers: (state, action) => {
      state.offers = action.payload;
    },
  },
});

export const offersActions = offersSlice.actions;
export default offersSlice.reducer;
