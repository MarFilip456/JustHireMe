import React, { useEffect, useState, useMemo } from 'react'
import useGeolocation from '../../hooks/use-geolocation';
import { useNavigate, useParams } from 'react-router-dom';
import { offerObject, offersActions } from '../../store/offers-slice';
import JobHeader from './jobDescription/JobHeader';
import Rectangles from './jobDescription/Rectangles';
import Map from '../map/Map';
import TechStack from './jobDescription/TechStack';
import Description from './jobDescription/Description';
import AppliersList from '../emplProfile/list/AppliersList';
import Button from '../../UI/Button';
import { useAppSelector, useAppDispatch } from '../../store/redux-hooks';
import useApply from '../../hooks/use-apply';
import { uiActions } from '../../store/ui-slice';

import classes from './JobDescription.module.css';

const JobDescription: React.FC<{ job: offerObject }> = (props) => {
  const offer = useAppSelector((state) => state.offers.offers);
  const isLoggedIn = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state) => state.ui.isDev);
  const navigate = useNavigate();
  const params = useParams<{ jobId: string }>();
  const dispatch = useAppDispatch();
  const actualApply = useApply(params.jobId!);
  const {
    error: mapError,
    loading: mapLoading,
    lat: mapLat,
    lng: mapLng,
  } = useGeolocation(props.job.location!);
  const loggedUser = localStorage.getItem('justHireMeId');
  const loggedExactEmpl = offer[0].addedBy === loggedUser;
  const loggedSomeEmpl = !isDev && isLoggedIn;
  const loggedDev = isDev && isLoggedIn;
  // contructing an array of id's of devs that already applied
  let appliersArray: { id: string }[] = useMemo(() => [], []);

  useEffect(() => {
    for (const key in offer[0].appliers!) {
      if (appliersArray.length === 0) {
        appliersArray.push({
          id: offer[0].appliers[key].devId,
        });
      }
    }
  }, [appliersArray, offer]);
  // checking if user has already applied for posiion
  const [devAlreadyApplied, setDevAlreadyApplied] = useState(false);

  useEffect(() => {
    let i: number;
    for (i = 0; i < appliersArray.length; i++) {
      if (appliersArray[i].id === loggedUser) {
        setDevAlreadyApplied(true);
      }
    }
  }, [appliersArray, loggedUser]);

  // edit/aply handler
  const CTAHandler = (event: React.MouseEvent) => {
    if (loggedDev) {
      // aply for a job
      actualApply();
      setDevAlreadyApplied(true);
      // add logic for outputting some info that you already aplied
    } else if (loggedExactEmpl) {
      alert(
        'After editing you loose acces to the devs that already appllied.Are you sure?'
      );
    } else if (loggedSomeEmpl) {
      alert('As an employeer you cannot apply!');
    } else {
      navigate('/devlogin');
    }
  };

  const deleteHandler = () => {
    dispatch(
      offersActions.setOffers(
        Object.assign({}, offer, {
          id: params.jobId,
        })
      )
    );
    dispatch(uiActions.changeDeletePopup());
  };

  return (
    <React.Fragment>
      <JobHeader />
      <Rectangles />
      <div className={classes.offer_map}>
        {mapError && <p>Error occured!</p>}
        {mapLoading && <p>Loading spinner</p>}
        {/* {mapLat !== 0 && (
          <Map width="100%" height="200px" lat={mapLat} lng={mapLng} />
        )} */}
      </div>
      <TechStack offerArray={offer[0].techStack!} />
      <Description />
      {devAlreadyApplied && <p>You already applied for this position</p>}
      {!devAlreadyApplied && (
        <Button styles={classes.CTA_button} onClick={CTAHandler}>
          {loggedExactEmpl ? "Edit" : "Apply"}
        </Button>
      )}
      {loggedExactEmpl && <Button onClick={deleteHandler}>Delete offer</Button>}
      {loggedExactEmpl && <AppliersList appliersArray={appliersArray} />}
    </React.Fragment>
  );
};

export default JobDescription;
