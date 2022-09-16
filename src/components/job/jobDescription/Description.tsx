import React from 'react';
import { offerObject } from '../../../store/offers-slice';
import parse from 'html-react-parser';

import classes from './Description.module.css';

const Description: React.FC<{job: offerObject}> = (props) => {
  const { job } = props;
  return (
      <div className={classes.offer_description}>
          { job.description ? parse(job.description!) : 'No description provided'}
      </div>
  );
};

export default Description;
