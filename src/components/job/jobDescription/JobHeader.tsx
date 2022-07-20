import { useAppSelector } from "../../../store/redux-hooks";

import classes from "./JobHeader.module.css";

const JobHeader = () => {
  const offer = useAppSelector((state) => state.offers.offers[0]);

  return (
    <div className={classes.offer_header}>
      <button>Back</button>
      <div className={classes.offer_header__logo}>
        <img alt="company_logo" src={offer.logo} width="100px" />
      </div>
      <div className={classes.offer_header__position}>
        <p>{offer.jobPosition}</p>
        <p>{offer.location}</p>
      </div>
      <div className={classes.offer_header__salary}>
        <p>{offer.minSalary}</p>
        <p>{offer.maxSalary}</p>
      </div>
    </div>
  );
};

export default JobHeader;
