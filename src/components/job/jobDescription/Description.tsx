import React, { Fragment } from 'react';
import { offerObject } from '../../../store/offers-slice';

import classes from './Description.module.css';

const Description: React.FC<{job: offerObject}> = (props) => {
  const { job } = props;
  return (
    <Fragment>
      <div className={classes.offer_description}>
        <div>{job.aboutUs}AboutUs</div>
        <div>
          description
          {job.description}
        </div>
        <div>
          requirements
          {job.requirements}
        </div>
      </div>
    </Fragment>
  );
};

export default Description;
