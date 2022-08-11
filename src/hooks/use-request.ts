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
            id: key,
            logo: responseData[key].logo,
            jobPosition: responseData[key].jobPosition,
            location: responseData[key].location,
            aboutUs: responseData[key].aboutUs,
            addedBy: responseData[key].addedBy,
            companyName: responseData[key].companyName,
            companySize: responseData[key].companySize,
            description: responseData[key].description,
            expLevel: responseData[key].expLevel,
            requirements: responseData[key].requirements,
            techStack: responseData[key].techStack,
            date: responseData[key].date,
            fullyRemote: responseData[key].fullyRemote,
            employment: responseData[key].employment,
            appliers: responseData[key].appliers,
            mainLang: responseData[key].mainLang,
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
