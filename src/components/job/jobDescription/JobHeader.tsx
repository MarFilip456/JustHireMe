import { useAppSelector } from "../../../store/redux-hooks";
import { useNavigate } from "react-router-dom";

import classes from "./JobHeader.module.css";
import React from "react";

const JobHeader = () => {
  const offer = useAppSelector((state) => state.offers.offers[0]);
  const navigate = useNavigate();

  const backButtonHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/");
  };
  const arrowUrl = "https://cdn-icons-png.flaticon.com/512/271/271218.png";
  const markerIconUrl =
    "../../../images/markerIcon.png";
  const undisclosedSalary =
    offer.employment.b2b?.minSalary === undefined &&
    offer.employment.uop?.minSalary === undefined;

  const remoteAtAll = offer.fullyRemote !== undefined;

  return (
    <div className={classes.offer_header}>
      <button
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
          <img alt="marker_icon" src={markerIconUrl} />
          <p>{offer.location}</p>
        </div>
        {remoteAtAll && (
          <div className={classes.remote_badge}>
            <p>{offer.fullyRemote ? "Fully Remote" : "Partly Remote"}</p>
          </div>
        )}
      </div>
      <div className={classes.offer_header__salary}>
        {undisclosedSalary && <p>Undisclosed Salary</p>}
        {offer.employment.b2b?.minSalary && (
          <p>
            {offer.employment.b2b.minSalary} - {offer.employment.b2b.maxSalary} PLN
            <span>net/month - B2B</span>
          </p>
        )}
        {offer.employment.uop?.minSalary && (
          <p>
            {offer.employment.uop.minSalary} - {offer.employment.uop.maxSalary} PLN
            <span>gross/month - UoP</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default JobHeader;
