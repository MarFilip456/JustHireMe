import { Fragment, useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FetchOffers } from "../../store/request-actions";
import { useSelector, useDispatch } from "react-redux";

import JobShort from "./JobShort";
import classes from "./JobsList.module.css";

const JobsList = () => {
  const dispatch = useDispatch();
  const fetchOffersHandler = useCallback(async () => {
    dispatch(FetchOffers);
  }, [dispatch]);
  useEffect(() => {
    fetchOffersHandler();
  }, [fetchOffersHandler]);

  const offers = useSelector((state) => state.offers.offers);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.ui.error);

  /* const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); */

  /* const fetchOffersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://justhireme-de5cc-default-rtdb.europe-west1.firebasedatabase.app/.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const loadedOffers = [];

      for (const key in data) {
        loadedOffers.push({
          id: key,
          companyName: data[key].companyName,
          jobPosition: data[key].jobPosition,
          location: data[key].location,
          logo: data[key].logo,
          maxSalary: data[key].maxSalary,
          minSalary: data[key].minSalary,
          description: data[key].description,
        });
      }
      setOffers(loadedOffers);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []); */
  return (
    <Fragment>
      <ul className={classes.job_list}>
        {isLoading && <p>Loading...</p>}
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
      {error && (
        <p>
          An unexpected error occured: <span>{error}</span>
        </p>
      )}
    </Fragment>
  );
};

export default JobsList;
