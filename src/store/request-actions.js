import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setOffers } from "./offers-slice";
import { showError, loading } from "./ui-slice";

export async function FetchOffers() {
  const dispatch = useDispatch();
  dispatch(loading());
  dispatch(showError());
  const loadedOffers = [];
  const errMess = null;
  try {
    const response = await fetch(
      process.env.REACT_APP_API_DATABASE_URL
    );

    if (!response.ok) {
      console.log("here");
      throw new Error("Something went wrong!");
    }
    const data = await response.json();

    for (const key in data) {
      loadedOffers.push({
        id: key,
        companyName: data[key].companyName,
        jobPosition: data[key].jobPosition,
        location: data[key].location,
        logo: data[key].logo,
        maxSalary: data[key].maxSalary,
        minSalary: data[key].minSalary,
        description: data[key].description,
      });
    }
  } catch (error) {
    errMess = error.message;
  }
  dispatch(showError(errMess));
  dispatch(loading());
  dispatch(setOffers(loadedOffers));
}
