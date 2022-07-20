import { useAppSelector } from "../../../store/redux-hooks";

import classes from "./Rectangles.module.css";

const Rectangles = () => {
  const offer = useAppSelector((state) => state.offers.offers[0]);

  return (
    <div className={classes.offer_boxes}>
      <div className={classes.offer_boxes__name}>
        <p>{offer.companyName}</p>
      </div>
      <div className={classes.offer_boxes__size}>
        <p>{offer.companySize}</p>
      </div>
      <div className={classes.offer_boxes__exp}>
        <p>{offer.expLevel}</p>
      </div>
      <div className={classes.offer_boxes__remote}>
        <p>RemoteOrNo</p>
      </div>
    </div>
  );
};

export default Rectangles;
