import { Fragment } from "react";
import ApplierItem from "./ApplierItem";
import useFilterDevs from "../../../hooks/use-filterDevs";
import { useAppSelector } from "../../../store/redux-hooks";

import classes from "./AppliersList.module.css";

const AppliersList: React.FC<{ appliersArray: { id: string }[] }> = (props) => {
  useFilterDevs(props.appliersArray);
  
  const filteredDevs = useAppSelector((state) => state.devs.devs);

  return (
    <Fragment>
      <p>List of devs that applied</p>
      <ul className={classes.list}>
        {filteredDevs &&
          filteredDevs!.map((dev) => (
            <li key={dev.id} className={classes.list_item}>
              <ApplierItem
                id={dev.id}
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
      {filteredDevs.length === 0 && <p>No one applied.</p>}
    </Fragment>
  );
};
export default AppliersList;