import React, { Fragment } from "react";
import useGeolocation from "../../hooks/use-geolocation";
import { useNavigate } from "react-router-dom";
import { offerObject } from "../../store/offers-slice";
import JobHeader from "./jobDescription/JobHeader";
import Rectangles from "./jobDescription/Rectangles";
import Map from "../map/Map";
import TechStack from "./jobDescription/TechStack";
import Description from "./jobDescription/Description";
import AppliersList from "../emplProfile/AppliersList";
import Button from "../../UI/Button";
import { useAppSelector } from "../../store/redux-hooks";
import useApply from "../../hooks/use-apply";
import { useParams } from "react-router-dom";

import classes from "./JobDescription.module.css";


const JobDescription: React.FC<{ job: offerObject }> = (props) => {
  const offer = useAppSelector((state) => state.offers.offers);
  const isLoggedIn = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state) => state.ui.isDev);
  const navigate = useNavigate();
  const params = useParams<{ jobId: string }>();
  const actualApply = useApply(params.jobId!);
  const {
    error: mapError,
    loading: mapLoading,
    lat: mapLat,
    lng: mapLng,
  } = useGeolocation(props.job.location);

  const loggedExactEmpl =
    offer[0].addedBy === localStorage.getItem("justHireMeId");
  const loggedSomeEmpl = !isDev && isLoggedIn;
  const loggedDev = isDev && isLoggedIn;

  const CTAHandler = (event: React.MouseEvent) => {
    if (loggedDev) {
      // aply for a job
      actualApply();
      // add logic for outputting some info that you already aplied
    } else if (loggedExactEmpl) {
      alert(
        "After editing you loose acces to the devs that already appllied.Are you sure?"
      );
    } else if (loggedSomeEmpl) {
      alert("As an employeer you cannot apply!");
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
      <Button styles={classes.CTA_button} onClick={CTAHandler}>
        {loggedExactEmpl ? "Edit" : "Apply"}
      </Button>
      {loggedExactEmpl && (
        <AppliersList />
      )}
    </Fragment>
  );
};

export default JobDescription;
