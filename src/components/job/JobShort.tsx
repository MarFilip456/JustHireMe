import React from "react";
import Card from "../../UI/Card";
import useCountDays from "../../hooks/use-countDays";

import classes from "./JobShort.module.css";

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
 
  return (
    <Card styles={classes.job_short__container}>
      <img
        alt={"company_logo"}
        src={props.logo}
        className={classes.job_short_img}
      />
      <div className={classes.job_short_cont1}>
        <h1 className={classes.job_short_company}>{props.jobPosition}</h1>
        <h2 className={classes.job_short__salary}>
          {!props.undisclosed
            ? `${props.minSalary} - ${props.maxSalary}`
            : "Undisclosed Salary"}
        </h2>
      </div>
      <div className={classes.job_short_cont2}>
        <div>{useCountDays(props.date)}</div>
        <h2 className={classes.job_short__location}>{props.location}</h2>
      </div>
    </Card>
  );
};

export default JobShort;
