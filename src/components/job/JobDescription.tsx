import { Fragment } from "react";
import useLocation from "../../hooks/use-location";
import { offerObject } from "../../store/offers-slice";
import Map from "../map/Map";
import JobStack from "./JobStack";

import classes from "./JobDescription.module.css";


const JobDescription: React.FC<{ job: offerObject }> = (props) => {
  const {
    error: mapError,
    loading: mapLoading,
    lat: mapLat,
    lng: mapLng,
  } = useLocation(props.job.location);

  return (
    <Fragment>
      <div className={classes.offer_header}>
        <button>Back</button>
        <div className={classes.offer_header__logo}>
          <img alt="company_logo" src={props.job.logo} width="100px" />
        </div>
        <div className={classes.offer_header__position}>
          <p>{props.job.jobPosition}</p>
          <p>{props.job.location}</p>
        </div>
        <div className={classes.offer_header__salary}>
          <p>{props.job.minSalary}</p>
          <p>{props.job.maxSalary}</p>
        </div>
      </div>
      <div className={classes.offer_boxes}>
        <div className={classes.offer_boxes__name}>
          <p>{props.job.companyName}</p>
        </div>
        <div className={classes.offer_boxes__size}>
          <p>{props.job.companySize}</p>
        </div>
        <div className={classes.offer_boxes__exp}>
          <p>{props.job.expLevel}</p>
        </div>
        <div className={classes.offer_boxes__remote}>
          <p>RemoteOrNo</p>
        </div>
      </div>
      <div className={classes.offer_map}>
        {mapError && <p>Error occured!</p>}
        {mapLoading && <p>Loading spinner</p>}
        {/* {mapLat!==0 && <Map width="100%" height="200px" lat={mapLat} lng={mapLng} />} */}
      </div>
      <div className={classes.offer_stack}>
        <JobStack />
      </div>
      <div className={classes.offer_description}>
        <div>{props.job.aboutUs}AboutUs</div>
        <div>
          description
          {props.job.description}
        </div>
        <div>
          requirements
          {props.job.requirements}
        </div>
      </div>
      <div>Apply button</div>
      <div>Appearing bar top</div>
      <div>Appearing bar bottom</div>
    </Fragment>
  );
};

export default JobDescription;
