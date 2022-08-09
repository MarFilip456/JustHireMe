import { createSlice } from "@reduxjs/toolkit";

export type offerObject = {
  companyName?: string;
  description?: string;
  aboutUs?: string;
  addedBy?: string;
  companySize?: number;
  expLevel?: string;
  mainLang?: string;
  requirements?: string;
  id?: string;
  jobPosition?: string;
  key?: string;
  location?: string;
  logo?: string;
  techStack?: { lang: string; value: number }[];
  date?: { day: number; month: number; year: number };
  fullyRemote?: boolean;
  appliers?: { devId: string }[];
  employment?: {
    undisclosed: boolean;
    b2b?: {
      minSalary: string;
      maxSalary: string;
    };
    uop?: {
      minSalary: string;
      maxSalary: string;
    };
  };
};

interface initialOffersStateType {
  offers: offerObject[];
  addingOffer: offerObject;
}

const initialState: initialOffersStateType = {
  offers: [],
  addingOffer: {},
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setOffers: (state, action) => {
      state.offers = action.payload;
    },
    addOffer: (state, action) => {
      state.addingOffer = action.payload;
    },
  },
});

export const offersActions = offersSlice.actions;
export default offersSlice.reducer;
