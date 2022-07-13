import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/redux-hooks";

import JobShort from "./JobShort";
import classes from "./JobsList.module.css";
import useFetch from "./use-request";

const JobsList = () => {
  const { error, loading } = useFetch(
    process.env.REACT_APP_API_DATABASE_URL
  );
  const offers = useAppSelector((state) => state.offers.offers);

  return (
    <Fragment>
      <ul className={classes.job_list}>
        {loading && <p>Loading...</p>}
        {error && <p>!Error message!</p>}
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