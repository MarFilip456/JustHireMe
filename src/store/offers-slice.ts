import { createSlice } from '@reduxjs/toolkit';

export type techStackType = {
  id: string;
  lang: string;
  value: string;
};

export type offerObject = {
  companyName?: string;
  description?: string;
  addedBy?: string;
  companySize?: number;
  expLevel?: string;
  mainField?: string;
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

export type queryObject = {
  search?: string;
  location?:string;
  mainField?: string;
  minSalary?: number;
  maxSalary?: number;
  employment?: string;
  experience?: string;
  undisclosed?: string;
  remote?: string;
}

interface initialOffersStateType {
  offers: offerObject[];
  addingOffer: offerObject;
  queries: queryObject;
}

const initialState: initialOffersStateType = {
  offers: [],
  addingOffer: {},
  queries: {}
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
    },
    setQueryObject: (state, action) => {
      state.queries = action.payload;
    }
  }
});

export const offersActions = offersSlice.actions;
export default offersSlice.reducer;
