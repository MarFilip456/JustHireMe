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
  // eslint-disable-next-line no-undef
  let dateConetnt;
  if (useCountDays(props.date) === 'New') {
    dateConetnt = <p className={classes.newOffer} >New</p>
  } else {
    dateConetnt = useCountDays(props.date);
  }
  return (
    <Card styles={classes.job_short__container}>
      <img
        alt={'company_logo'}
        src={props.logo}
        className={classes.job_short_img}
      />
      <div className={classes.job_short__containerTwo} >
      <div className={classes.job_short_cont1}>
        <h1 className={classes.job_short_company}>{props.jobPosition}</h1>
        <h2 className={classes.job_short__salary}>
          {!props.undisclosed
            ? `${props.minSalary} - ${props.maxSalary}`
            : 'Undisclosed Salary'}
        </h2>
      </div>
      <div className={classes.job_short_cont2}>
        <div>{dateConetnt}</div>
        <h2 className={classes.job_short__location}>{props.location}</h2>
      </div>
      </div>
    </Card>
  );
};

export default JobShort;
