import { uiActions } from "./ui-slice";
import { setOffers } from "./offers-slice";

export const fetchOffersData = () => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading());
    const fetchData = async () => {
      const response = await fetch(process.env.REACT_APP_API_DATABASE_URL);
      if (!response.ok) {
        throw new Error("Could not fetch offers!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const offersData = await fetchData();
      dispatch(setOffers(offersData));
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
