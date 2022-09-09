import React from 'react';
import { useNavigate } from 'react-router-dom';
import markerIcon from '../../../images/markerIcon.png';
import { offerObject } from '../../../store/offers-slice';

import classes from './JobHeader.module.css';

const JobHeader: React.FC<{ job: offerObject }> = (props) => {
  const { job } = props;
  const navigate = useNavigate();

  const backButtonHandler = (event: React.MouseEvent) => {
    navigate(-1);
  };
  const arrowUrl = 'https://cdn-icons-png.flaticon.com/512/271/271218.png';

  const remoteAtAll = job.fullyRemote !== undefined;

  const offerSalary = (job: {
    undisclosed: boolean;
    b2b?: { allowB2b: boolean; minSalary: string; maxSalary: string };
    uop?: { allowUop: boolean; minSalary: string; maxSalary: string };
  }) => {
    if (job.undisclosed) {
      return <p>Undisclosed Salary</p>;
    } else if (!job.b2b?.allowB2b && job.uop?.allowUop) {
      return (
        <p>
          {job.uop.minSalary} - {job.uop.maxSalary} PLN
          <span>gross/month - UoP</span>
        </p>
      );
    } else if (job.b2b?.allowB2b && !job.uop?.allowUop) {
      return (
        <p>
          {job.b2b.minSalary} - {job.b2b.maxSalary} PLN
          <span>net/month - B2B</span>
        </p>
      );
    } else if (job.b2b?.allowB2b && job.uop?.allowUop) {
      return (
        <div>
          <p>
            {job.b2b.minSalary} - {job.b2b.maxSalary} PLN
            <span>net/month - B2B</span>
          </p>
          <p>
            {job.uop.minSalary} - {job.uop.maxSalary} PLN
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
        <img alt="company_logo" src={job.logo} width="100px" />
      </div>
      <div className={classes.offer_header__position}>
        <h1>{job.jobPosition}</h1>
        <div className={classes.offer_header_location}>
          <img alt="marker_icon" src={markerIcon} />
          <p>{job.location}</p>
        </div>
        {remoteAtAll && (
          <div className={classes.remote_badge}>
            <p>{job.fullyRemote ? 'Fully Remote' : 'Partly Remote'}</p>
          </div>
        )}
      </div>
      <div className={classes.offer_header__salary}>
        {offerSalary(job.employment!)}
      </div>
    </div>
  );
};

export default JobHeader;
