import { createSlice } from '@reduxjs/toolkit';

export type techStackType = {
  id: string;
  lang: string;
  value: string;
};

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
  location?: string;
  lat?: number;
  lng?: number;
  logo?: string;
  techStack?: techStackType[];
  date?: { day: number; month: number; year: number };
  fullyRemote?: boolean;
  appliers?: {
    id: string;
    email: string;
    name: string;
    surname: string;
    logoUrl: string;
    experience: string;
    mainLang: string;
    location: string;
    aboutYou: string;
    gitHubUrl: string;
    linkedInUrl: string;
  }[];
  employment?: {
    undisclosed: boolean;
    b2b: {
      allowB2b: boolean;
      minSalary: string;
      maxSalary: string;
    };
    uop: {
      allowUop: boolean;
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
  addingOffer: {}
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers: (state, action) => {
      state.offers = action.payload;
    },
    addOffer: (state, action) => {
      state.addingOffer = action.payload;
    }
  }
});

export const offersActions = offersSlice.actions;
export default offersSlice.reducer;
