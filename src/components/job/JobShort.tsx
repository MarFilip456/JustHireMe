import React from 'react';
import Card from '../../UI/Card';
import useCountDays from '../../hooks/use-countDays';

import classes from './JobShort.module.css';

const JobShort: React.FC<{
  logo: string;
  jobPosition: string;
  undisclosed: boolean;
  minSalary?: string;
  maxSalary?: string;
  location: string;
  id: string;
  date: { year: number; month: number; day: number };
}> = (props) => {
  let dateConetnt;
  if (useCountDays(props.date) === 'New') {
    dateConetnt = <p className={classes.newOffer}>New</p>;
  } else {
    dateConetnt = useCountDays(props.date);
  }
  return (
    <Card styles={classes.job_short}>
      <img
        alt={'company_logo'}
        src={props.logo}
        className={classes.job_short_img}
      />
      <div className={classes.job_short_information}>
        <div className={classes.job_short_cont1}>
          <h1 className={classes.job_short_company}>{props.jobPosition}</h1>
          <h2 className={classes.job_short__salary}>
            {!props.undisclosed
              ? `${props.minSalary} - ${props.maxSalary}  PLN`
              : 'Undisclosed Salary'}
          </h2>
        </div>
        <div className={classes.job_short_cont2}>
          <div className={classes.job_short__date}>{dateConetnt}</div>
          <div className={classes.job_short__location}>
            <h2>{props.location}</h2>
            <svg
              height="24px"
              width="14px"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path fillOpacity=".3" d="M0 0h24v24H0z" fill="none"></path>
              <path
                fillOpacity=".3"
                d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobShort;
