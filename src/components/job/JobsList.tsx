import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { offerObject } from '../../store/offers-slice';

import JobShort from './JobShort';
import classes from './JobsList.module.css';
import LoadingSpinner from '../../UI/LoadingSpinner';

const JobsList: React.FC<{
  empId?: string;
  data: offerObject[];
  isLoading: boolean;
}> = (props) => {
  const { empId, data, isLoading } = props;
  const [offers, setOffers] = useState<offerObject[]>([]);
  useEffect(() => {
    if (empId !== undefined) {
      const addedOffers: offerObject[] = [];
      let i: number;
      for (i = 0; i < data.length; i++) {
        if (data[i].addedBy === empId) {
          addedOffers.push(data[i]);
        }
      }
      setOffers(addedOffers);
    } else if (data !== undefined) {
      setOffers(data);
    }
  }, [data, empId]);
  return (
    <Fragment>
      <ul className={classes.job_list}>
        {isLoading && <LoadingSpinner />}
        {offers.length > 0
          ? (
              offers.map((job) => (
            <Link to={'/jobdescr/' + job.id} key={job.id}>
              <JobShort
                key={job.id + 'child'}
                id={job.id!}
                logo={job.logo!}
                jobPosition={job.jobPosition!}
                undisclosed={job.employment!.undisclosed}
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
              ))
            )
          : (
          <p>No offers added.</p>
            )}
      </ul>
    </Fragment>
  );
};

export default JobsList;
