import { useAppSelector } from "../../../store/redux-hooks";

import classes from "./Rectangles.module.css";

const Rectangles = () => {
  const offer = useAppSelector((state) => state.offers.offers[0]);

  const countDays = () => {
    const currDate = new Date();
    const offerDate = new Date(
      offer.date.year,
      offer.date.month - 1,
      offer.date.day
    );
    const difference =
      (currDate.getTime() - offerDate.getTime()) / 1000 / 3600 / 24;
    if (difference < 1) {
      return "New";
    } else if (difference < 31) {
      const dayNumber = Math.round(difference);

      return `${dayNumber} days ago`;
    } else {
      return "Over month ago";
    }
  };

  return (
    <div className={classes.offer_boxes}>
      <div className={classes.offer_boxes__sub}>
        <p>{offer.companyName}</p>
        <p>Company name</p>
      </div>
      <div className={classes.offer_boxes__sub}>
        <p>{offer.companySize}</p>
        <p>Company size</p>
      </div>
      <div className={classes.offer_boxes__sub}>
        <p>{offer.expLevel}</p>
        <p>EXP. lvl</p>
      </div>
      <div className={classes.offer_boxes__sub}>
        <p>{countDays()}</p>
        <p>Added</p>
      </div>
    </div>
  );
};

export default Rectangles;
