import { uiActions } from "./ui-slice";
import { offersActions } from "./offers-slice";
import { AppThunk } from "./index";

const databaseUrl: string = process.env.REACT_APP_API_DATABASE_URL;

export const fetchOffersData: AppThunk = () => {
  return async (dispatch: any) => {
    dispatch(uiActions.setLoading());
    const fetchData = async () => {
      const response = await fetch(
        databaseUrl
      );
      if (!response.ok) {
        throw new Error("Could not fetch offers!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const offersData = await fetchData();
      const loadedOffers = [];
      for (const key in offersData) {
        loadedOffers.push({
          key: key,
          id: offersData[key].id,
          logo: offersData[key].logo,
          jobPosition: offersData[key].jobPosition,
          minSalary: offersData[key].minSalary,
          maxSalary: offersData[key].maxSalary,
          location: offersData[key].location,
        });
      }
      dispatch(uiActions.setLoading());
      dispatch(offersActions.setOffers(loadedOffers));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching data failed!",
        })
      );
      dispatch(uiActions.setLoading());
      dispatch(uiActions.setError());
    }
  };
};
