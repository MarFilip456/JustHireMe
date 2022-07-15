import { useEffect, useState, useCallback } from "react";
import { offersActions } from "../store/offers-slice";
import { useAppDispatch } from "../store/redux-hooks";

const useFetch = (url: string, type: string) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getThatData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      if (type === "all") {
        const loadedOffers: object[] = [];
        for (const key in responseData) {
          loadedOffers.push({
            key: key,
            id: responseData[key].id,
            logo: responseData[key].logo,
            jobPosition: responseData[key].jobPosition,
            minSalary: responseData[key].minSalary,
            maxSalary: responseData[key].maxSalary,
            location: responseData[key].location,
          });
        }
        dispatch(offersActions.setOffers(loadedOffers));
      } else if (type==="one") {
        const tempArr = [];
        tempArr.push(responseData);
        dispatch(offersActions.setOffers(tempArr));
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [url, type, dispatch]);
 
  useEffect(() => {
    getThatData();
  }, [getThatData]);

  return { error, loading };
};

export default useFetch;
