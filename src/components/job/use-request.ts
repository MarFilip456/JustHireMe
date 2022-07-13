import { useEffect, useState } from "react";
import { offersActions } from "../../store/offers-slice";
import { useAppDispatch } from "../../store/redux-hooks";
// move it to another location, something only for custom hooks
const useFetch = (url: string) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getThatData = async () => {
    setLoading(true);
    if (error) {
      setError(false);
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
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
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
// try to move useEffect out of here and call it in components
  useEffect(() => {
    getThatData();
  },[]);

  return { error, loading };
};

export default useFetch;
