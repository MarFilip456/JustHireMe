import { createSlice } from "@reduxjs/toolkit";

export type offerObject = {
  companyName: string;
  description: string;
  aboutUs: string;
  companySize: number;
  expLevel: string;
  requirements: string;
  id: string;
  jobPosition: string;
  key: string;
  location: string;
  logo: string;
  techStack: { lang: string; value: number }[];
  date: { day: number; month: number; year: number };
  fullyRemote: boolean;
  employment: {
    b2b: {
      minSalary: string;
      maxSalary: string;
    } | undefined;
    uop: {
      minSalary: string;
      maxSalary: string;
    } | undefined;
  }
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
