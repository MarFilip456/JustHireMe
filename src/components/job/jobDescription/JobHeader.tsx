import React from 'react';
import { useNavigate } from 'react-router-dom';
import { offerObject } from '../../../store/offers-slice';

import classes from './JobHeader.module.css';

const JobHeader: React.FC<{ job: offerObject }> = (props) => {
  const { job } = props;
  const navigate = useNavigate();

  const backButtonHandler = () => {
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
        <svg
              height="36px"
              width="21px"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path fillOpacity=".3" d="M0 0h24v24H0z" fill="none"></path>
              <path
                fillOpacity=".5"
                d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"
              ></path>
            </svg>
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
