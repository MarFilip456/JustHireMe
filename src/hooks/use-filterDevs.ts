import { useCallback, useMemo } from "react";

const useFilterDevs = (appliedArr: { id: string }[]) => {
  type devArrayType = {
    name?: string;
    surname?: string;
    logo?: string;
    email: string;
    experience?: string;
    mainLang?: string;
    location?: string;
    aboutYou?: string;
    gitHub?: string;
    linkedIn?: string;
    id: string;
    key: string;
  }[];

  let allDevsArray: devArrayType = useMemo(() => [], []);
  let filteredDevsArray: devArrayType = useMemo(() => [], []);
  const actualFilter = useCallback(async () => {
    try {
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
    } finally {
      let i: number;
      let j: number;
      for (i = 0; i < allDevsArray!.length; i++) {
        for (j = 0; j < appliedArr.length; j++) {
          if (allDevsArray![i] === appliedArr[j]) {
            filteredDevsArray.push(allDevsArray[i]);
          }
        }
      }
    }
  }, [appliedArr, allDevsArray, filteredDevsArray]);
  console.log(filteredDevsArray);

  return actualFilter;
};

export default useFilterDevs;
