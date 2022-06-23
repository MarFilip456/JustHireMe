import { Fragment, useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import JobShort from "./JobShort";
import classes from "./JobsList.module.css";

const JobsList = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOffersHandler = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchOffersHandler();
  }, [fetchOffersHandler]);

  return (
    <Fragment>
      <ul className={classes.job_list}>
        {isLoading && <p>Loading...</p>}
        {offers.length > 1 &&
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
        {error && (
          <p>
            An unexpected error occured: <span>{error}</span>
          </p>
        )}
      </ul>
    </Fragment>
  );
};

export default JobsList;
