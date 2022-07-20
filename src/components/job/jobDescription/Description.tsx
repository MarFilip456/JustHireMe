import { Fragment } from "react";
import { useAppSelector } from "../../../store/redux-hooks";

import classes from "./Description.module.css";

const Description = () => {
  const offer = useAppSelector((state) => state.offers.offers[0]);

  return (
    <Fragment>
      <div className={classes.offer_description}>
        <div>{offer.aboutUs}AboutUs</div>
        <div>
          description
          {offer.description}
        </div>
        <div>
          requirements
          {offer.requirements}
        </div>
      </div>
    </Fragment>
  );
};

export default Description;
