import { Fragment } from "react";
import useGeolocation from "../../hooks/use-geolocation";
import { offerObject } from "../../store/offers-slice";
import JobHeader from "./jobDescription/JobHeader";
import Rectangles from "./jobDescription/Rectangles";
import Map from "../map/Map";
import TechStack from "./jobDescription/TechStack";
import Description from "./jobDescription/Description";

import classes from "./JobDescription.module.css";

const JobDescription: React.FC<{ job: offerObject }> = (props) => {
  const {
    error: mapError,
    loading: mapLoading,
    lat: mapLat,
    lng: mapLng,
  } = useGeolocation(props.job.location);

  return (
    <Fragment>
      <JobHeader />
      <Rectangles />
      <div className={classes.offer_map}>
        {mapError && <p>Error occured!</p>}
        {mapLoading && <p>Loading spinner</p>}
        {/* {mapLat!==0 && <Map width="100%" height="200px" lat={mapLat} lng={mapLng} />} */}
      </div>
      <TechStack />
      <Description />
      <div>Appearing bar top</div>
      <div>Appearing bar bottom</div>
    </Fragment>
  );
};

export default JobDescription;
