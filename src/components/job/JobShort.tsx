import React from "react";
import Card from "../../UI/Card";

import classes from "./JobShort.module.css";

const JobShort: React.FC<{
  onClick?: (event: React.MouseEvent) => void;
  logo: string;
  jobPosition: string;
  minSalary: string;
  maxSalary: string;
  location: string;
  id: string;
  key: string;
}> = (props) => {
  const undisclosedSalary =
    props.minSalary !== undefined || props.maxSalary !== undefined;
  return (
    <Card styles={classes.job_short__container} onClick={props.onClick}>
      <img
        alt={"company_logo"}
        src={props.logo}
        className={classes.job_short_img}
      />
      <div className={classes.job_short_cont1}>
        <h1 className={classes.job_short_company}>{props.jobPosition}</h1>
        <h2 className={classes.job_short__salary}>
          {undisclosedSalary
            ? `${props.minSalary} - ${props.maxSalary}`
            : "Undisclosed Salary"}
        </h2>
      </div>
      <div className={classes.job_short_cont2}>
        <div>badge</div>
        <h2 className={classes.job_short__location}>{props.location}</h2>
      </div>
    </Card>
  );
};

export default JobShort;
