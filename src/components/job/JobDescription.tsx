import React, { Fragment } from "react";
import useGeolocation from "../../hooks/use-geolocation";
import { useNavigate } from "react-router-dom";
import { offerObject } from "../../store/offers-slice";
import JobHeader from "./jobDescription/JobHeader";
import Rectangles from "./jobDescription/Rectangles";
import Map from "../map/Map";
import TechStack from "./jobDescription/TechStack";
import Description from "./jobDescription/Description";
import Button from "../../UI/Button";
import { useAppSelector } from "../../store/redux-hooks";

import classes from "./JobDescription.module.css";

const JobDescription: React.FC<{ job: offerObject }> = (props) => {
  const isLoggedIn = useAppSelector((state) => state.ui.isLoggedIn);
  const navigate = useNavigate();
  const {
    error: mapError,
    loading: mapLoading,
    lat: mapLat,
    lng: mapLng,
  } = useGeolocation(props.job.location);

  const applyHandler = (event: React.MouseEvent) => {
    if (isLoggedIn) {
      // aply for a job
      console.log("Let's say you applied.");
    } else {
      navigate("/devlogin");
    }
  };

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
      <Button styles={classes.apply_button} onClick={applyHandler}>
        Apply
      </Button>
    </Fragment>
  );
};

export default JobDescription;
