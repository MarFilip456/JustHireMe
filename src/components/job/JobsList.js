import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import JobShort from "./JobShort";
import classes from "./JobsList.module.css";

const JobsList = () => {

  const offers = useSelector((state) => state.offers.offers);
  const notification = useSelector((state) => state.ui.notification);

  return (
    <Fragment>
      <ul className={classes.job_list}>
        {offers &&
          offers.map((job) => (
            <Link to={"jobdescr/" + job.id} key={job.id}>
              <JobShort
                key={job.id}
                id={job.id}
                logo={job.logo}
                jobPosition={job.jobPosition}
                minSalary={job.minSalary}
                maxSalary={job.maxSalary}
                location={job.location}
              />
            </Link>
          ))}
      </ul>
    </Fragment>
  );
};

export default JobsList;
