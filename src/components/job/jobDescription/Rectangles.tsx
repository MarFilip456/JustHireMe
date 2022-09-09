import React from 'react';
import useCountDays from '../../../hooks/use-countDays';
import officeIcon from '../../../images/officeIcon.png';
import peopleIcon from '../../../images/peopleIcon.png';
import stockIcon from '../../../images/stockIcon.png';
import calendarIcon from '../../../images/calendarIcon.png';

import classes from './Rectangles.module.css';
import { offerObject } from '../../../store/offers-slice';

const Rectangles: React.FC<{ job: offerObject }> = (props) => {
  const { job } = props;

  return (
    <div className={classes.offer_boxes}>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <img alt="office_icon" src={officeIcon} />
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>{job.companyName}</p>
          <p className={classes.info_description}>Company name</p>
        </div>
      </div>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <img alt="people_icon" src={peopleIcon} />
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>{job.companySize}</p>
          <p className={classes.info_description}>Company size</p>
        </div>
      </div>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <img alt="stock_icon" src={stockIcon} />
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>{job.expLevel}</p>
          <p className={classes.info_description}>EXP. lvl</p>
        </div>
      </div>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <img alt="calendar_icon" src={calendarIcon} />
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>{useCountDays(job.date!)}</p>
          <p className={classes.info_description}>Added</p>
        </div>
      </div>
    </div>
  );
};

export default Rectangles;
