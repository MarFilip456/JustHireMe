import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/redux-hooks";

import JobShort from "./JobShort";
import classes from "./JobsList.module.css";
import { fetchOffersData } from "../../store/request-actions";

const JobsList = () => {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers.offers);
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const isError = useAppSelector((state) => state.ui.isError);
  const notificationMessage = useAppSelector(
    (state) => state.ui.notification.message
  );
    useEffect(() => {
      dispatch(fetchOffersData());
    }, [dispatch]);

  return (
    <Fragment>
      <ul className={classes.job_list}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{notificationMessage}</p>}
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
