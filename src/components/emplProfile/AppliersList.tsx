import { Fragment } from "react";
import DevShort from "./DevShort";
import useFilterDevs from "../../hooks/use-filterDevs";
import { useAppSelector } from "../../store/redux-hooks";

import classes from "./AppliersList.module.css";

const AppliersList = () => {
  const offer = useAppSelector((state) => state.offers.offers[0]);

  let appliersArray: { id: string }[] = [];

  for (const key in offer.appliers) {
    appliersArray!.push({
      id: offer.appliers[key].devId,
    });
  }

  useFilterDevs(appliersArray);

  const filteredDevs = useAppSelector((state) => state.devs.devs);

  return (
    <Fragment>
      <p>List of devs that applied</p>
      <ul className={classes.list}>
        {filteredDevs &&
          filteredDevs!.map((dev) => (
            <li key={dev.id} className={classes.list_item}>
                <DevShort
                  id={dev.id}
                  key={dev.id}
                  name={dev.name!}
                  surname={dev.surname!}
                  mainLang={dev.mainLang!}
                  experience={dev.experience!}
                  location={dev.location!}
                  gitHub={dev.gitHub!}
                  logo={dev.logo!}
                  email={dev.email}
                  aboutYou={dev.aboutYou!}
                  linkedIn={dev.linkedIn!}
                />
            </li>
          ))}
      </ul>
      {!filteredDevs && <p>No one applied.</p>}
    </Fragment>
  );
};
export default AppliersList;
