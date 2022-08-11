import { useAppSelector } from "../../../store/redux-hooks";
import useCountDays from "../../../hooks/use-countDays";
import officeIcon from "../../../images/officeIcon.png";
import peopleIcon from "../../../images/peopleIcon.png";
import stockIcon from "../../../images/stockIcon.png";
import calendarIcon from "../../../images/calendarIcon.png";

import classes from "./Rectangles.module.css";

const Rectangles = () => {
  const offer = useAppSelector((state) => state.offers.offers[0]);

  return (
    <div className={classes.offer_boxes}>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <img alt="office_icon" src={officeIcon} />
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>{offer.companyName}</p>
          <p className={classes.info_description}>Company name</p>
        </div>
      </div>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <img alt="people_icon" src={peopleIcon} />
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>{offer.companySize}</p>
          <p className={classes.info_description}>Company size</p>
        </div>
      </div>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <img alt="stock_icon" src={stockIcon} />
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>{offer.expLevel}</p>
          <p className={classes.info_description}>EXP. lvl</p>
        </div>
      </div>
      <div className={classes.offer_boxes__sub}>
        <div className={classes.img_container}>
          <img alt="calendar_icon" src={calendarIcon} />
        </div>
        <div className={classes.info_container}>
          <p className={classes.info_offer}>{useCountDays(offer.date!)}</p>
          <p className={classes.info_description}>Added</p>
        </div>
      </div>
    </div>
  );
};

export default Rectangles;
