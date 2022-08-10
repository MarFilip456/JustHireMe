import { useAppSelector } from "../../../store/redux-hooks";
import { useNavigate } from "react-router-dom";
import markerIcon from "../../../images/markerIcon.png";

import classes from "./JobHeader.module.css";
import React from "react";

const JobHeader = () => {
  const offer = useAppSelector((state) => state.offers.offers[0]);
  const navigate = useNavigate();

  const backButtonHandler = (event: React.MouseEvent) => {
    navigate(-1);
  };
  const arrowUrl = "https://cdn-icons-png.flaticon.com/512/271/271218.png";

  const remoteAtAll = offer.fullyRemote !== undefined;

  const offerSalary = (offer: {
    b2b?: { minSalary: string; maxSalary: string };
    uop?: { minSalary: string; maxSalary: string };
  }) => {
    if (offer.b2b === undefined && offer.uop === undefined) {
      return <p>Undisclosed Salary</p>;
    } else if (offer.b2b === undefined && offer.uop) {
      return (
        <p>
          {offer.uop.minSalary} - {offer.uop.maxSalary} PLN
          <span>gross/month - UoP</span>
        </p>
      );
    } else if (offer.b2b && offer.uop === undefined) {
      return (
        <p>
          {offer.b2b.minSalary} - {offer.b2b.maxSalary} PLN
          <span>net/month - B2B</span>
        </p>
      );
    } else if (offer.b2b && offer.uop) {
      return (
        <div>
          <p>
            {offer.b2b.minSalary} - {offer.b2b.maxSalary} PLN
            <span>net/month - B2B</span>
          </p>
          <p>
            {offer.uop.minSalary} - {offer.uop.maxSalary} PLN
            <span>gross/month - UoP</span>
          </p>
        </div>
      );
    }
  };

  return (
    <div className={classes.offer_header}>
      <button
        id="backButton"
        onClick={backButtonHandler}
        className={classes.offer_header__backButton}
      >
        <img alt="back_arrow" src={arrowUrl} />
      </button>
      <div className={classes.offer_header__logo}>
        <img alt="company_logo" src={offer.logo} width="100px" />
      </div>
      <div className={classes.offer_header__position}>
        <h1>{offer.jobPosition}</h1>
        <div className={classes.offer_header_location}>
          <img alt="marker_icon" src={markerIcon} />
          <p>{offer.location}</p>
        </div>
        {remoteAtAll && (
          <div className={classes.remote_badge}>
            <p>{offer.fullyRemote ? "Fully Remote" : "Partly Remote"}</p>
          </div>
        )}
      </div>
      <div className={classes.offer_header__salary}>
        {offerSalary(offer.employment!)}
      </div>
    </div>
  );
};

export default JobHeader;
