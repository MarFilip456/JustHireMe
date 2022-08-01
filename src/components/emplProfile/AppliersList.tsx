import { Fragment, useEffect } from "react";
import DevShort from "./DevShort";
import useFilterDevs from "../../hooks/use-filterDevs";
import { useAppSelector } from "../../store/redux-hooks";

const AppliersList = () => {
  const offer = useAppSelector((state) => state.offers.offers[0]);
  let appliersArray: { id: string }[] = [];

  for (const key in offer.appliers) {
    appliersArray!.push({
      id: offer.appliers[key].devId,
    });
  }

  const filteredDevs = useFilterDevs(appliersArray);

  useEffect(()=>{
    const letItWork = async() => await filteredDevs();
    console.log(letItWork)
  },[])

  return (
    <Fragment>
      <p>List of devs that applied</p>
      {/* {filteredDevs ? (
        filteredDevs!.map((dev) => (
          <DevShort
            id={dev.id}
            key={dev.id}
            name={dev.name}
            surname={dev.surname}
            mainLang={dev.mainLang}
            experience={dev.experience}
            location={dev.location}
          />
        ))
      ) : (
        <p>No one applied.</p>
      )} */}
    </Fragment>
  );
};
export default AppliersList;
