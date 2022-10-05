import React from 'react';
import useCountDays from '../../../hooks/use-countDays';
import classes from './Rectangles.module.css';
import { offerObject } from '../../../store/offers-slice';

const Rectangles: React.FC<{ job: offerObject }> = (props) => {
  const { job } = props;

  return (
    <div className={classes.offer_boxes}>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <svg
            className={classes.svg_companyname}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path>
          </svg>
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>{job.companyName}</p>
          <p className={classes.info_description}>Company name</p>
        </div>
      </div>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <svg
            className={classes.svg_companySize}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
          </svg>
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>{job.companySize}</p>
          <p className={classes.info_description}>Company size</p>
        </div>
      </div>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <svg
            className={classes.svg_experience}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"></path>
          </svg>
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>{job.expLevel}</p>
          <p className={classes.info_description}>EXP. lvl</p>
        </div>
      </div>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <svg
            className={classes.svg_date}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
          </svg>
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>
            {job.date !== undefined ? useCountDays(job.date!) : 'preview'}
          </p>
          <p className={classes.info_description}>Added</p>
        </div>
      </div>
    </div>
  );
};

export default Rectangles;
