import { useCallback, useMemo, useEffect } from "react";
import { devType } from "../store/filteredDevs-slice";
import { useAppDispatch } from "../store/redux-hooks";
import { devsActions } from "../store/filteredDevs-slice";
import { uiActions } from "../store/ui-slice";

const useFilterDevs = (desiredIdArr: { id: string }[]) => {
  const dispatch = useAppDispatch();
  let allDevsArray: devType[] = useMemo(() => [], []);
  let filteredDevsArray: devType[] = useMemo(() => [], []);
  const actualFilter = useCallback(async () => {
    try {
      dispatch(uiActions.setLoading());
      const response = await fetch(
        process.env.REACT_APP_API_DATABASE_USERS_URL + "/devs.json"
      );
      if (!response.ok) {
        alert("response not okay");
      }
      const responseData = await response.json();
      for (const key in responseData) {
        allDevsArray.push({
          name: responseData[key].name,
          surname: responseData[key].surname,
          logo: responseData[key].logo,
          email: responseData[key].email,
          experience: responseData[key].experience,
          mainLang: responseData[key].mainLang,
          location: responseData[key].location,
          aboutYou: responseData[key].aboutYou,
          gitHub: responseData[key].gitHub,
          linkedIn: responseData[key].linkedIn,
          id: responseData[key].userId,
          key: responseData[key].userId,
        });
      }
    } catch (error) {
      alert(error);
    }
    let i: number;
    let j: number;

    for (i = 0; i < allDevsArray.length; i++) {
      for (j = 0; j < desiredIdArr.length; j++) {
        if (allDevsArray[i].id === desiredIdArr[j].id) {
          filteredDevsArray.push(allDevsArray[i]);
        }
      }
    }
    dispatch(devsActions.setDevs(filteredDevsArray));
    dispatch(uiActions.setLoading());
  }, [desiredIdArr, allDevsArray, filteredDevsArray, dispatch]);
  // when i add actualFilter to dependency array, then it executes multiple times
  useEffect(() => {
    actualFilter();
  }, [actualFilter]);
  return;
};

export default useFilterDevs;
