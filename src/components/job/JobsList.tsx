import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/redux-hooks";

import JobShort from "./JobShort";
import classes from "./JobsList.module.css";
import useFetch from "../../hooks/use-request";

const JobsList = () => {
  const { error, loading } = useFetch(
    process.env.REACT_APP_API_DATABASE_URL + ".json",
    "all"
  );
  const offers = useAppSelector((state) => state.offers.offers);
  
// warn about miising key caused by not having id field in db, fix db
  return (
    <Fragment>
      <ul className={classes.job_list}>
        {loading && <p>Loading...</p>}
        {error && <p>!Error message!</p>}
        {offers.length>0 &&
          offers.map((job) => (
            // after going back from offer to list after first render warning
            <Link to={"/jobdescr/" + job.id} key={job.id}>
              <JobShort
                key={job.id + "child"}
                id={job.id!}
                logo={job.logo!}
                jobPosition={job.jobPosition!}
                undisclosed={job.employment?.undisclosed!}
                minSalary={
                  job.employment!.b2b.allowB2b
                    ? job.employment!.b2b.minSalary
                    : job.employment!.uop!.minSalary
                }
                maxSalary={
                  job.employment!.b2b.allowB2b
                    ? job.employment!.b2b.maxSalary
                    : job.employment!.uop!.maxSalary
                }
                location={job.location!}
                date={job.date!}
              />
            </Link>
          ))}
      </ul>
    </Fragment>
  );
};

export default JobsList;
