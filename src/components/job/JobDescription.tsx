import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { offerObject } from '../../store/offers-slice';
import useAddOffer from '../../hooks/use-addOffer';
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
import useSingleUser from '../../hooks/use-singleUser';

import classes from './JobDescription.module.css';

const JobDescription: React.FC<{ job: offerObject }> = (props) => {
  const { job } = props;
  const isLoggedIn = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state) => state.ui.isDev);
  const navigate = useNavigate();
  const params = useParams<{ jobId: string }>();
  const dispatch = useAppDispatch();
  const actualApply = useApply(params.jobId!);
  const token = localStorage.getItem('justHireMeToken');
  let loggedUser: string;
  if (token !== null) {
    const { data, isLoading } = useSingleUser();
    if (data && !isLoading) {
      loggedUser = data!.id!;
    }
  }
  const loggedExactEmpl = job.addedBy === loggedUser!;
  const loggedSomeEmpl = !isDev && isLoggedIn;
  const loggedDev = isDev && isLoggedIn;

  const addOffer = useAddOffer();

  // checking if user has already applied for posiion
  const [devAlreadyApplied, setDevAlreadyApplied] = useState(false);

  useEffect(() => {
    let i: number;
    if (job.appliers === undefined) {
      return;
    }
    for (i = 0; i < job.appliers!.length; i++) {
      if (job.appliers![i].id === loggedUser) {
        setDevAlreadyApplied(true);
      }
    }
  }, [job.appliers, loggedUser!]);

  // aply handler
  const CTAHandler = (event: React.MouseEvent) => {
    if (loggedDev) {
      actualApply();
      setDevAlreadyApplied(true);
    } else if (loggedSomeEmpl) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(uiActions.showInformation('As an employer you cannot apply!'));
    } else {
      navigate('/login');
    }
  };

  const addOfferHandler = () => {
    addOffer();
    navigate('/');
  };

  const deleteHandler = () => {
    dispatch(uiActions.changeDeletePopup());
  };
  const [loadMap, setLoadMap] = useState(false);
  useEffect(() => {
    if (job) {
      setLoadMap(true);
    }
  }, []);
  return (
    <div className={classes.main}>
      <div className={classes.main_description}>
        <JobHeader job={job} />
        <Rectangles job={job} />
        <div className={classes.description_map}>
          {loadMap && (
            <Map
              single={true}
              width="100%"
              height="100%"
              latLngArray={[{ lat: job.lat!, lng: job.lng!, tech: job.mainField! }]}
            />
          )}
        </div>
        <TechStack job={job} />
        <Description job={job} />
        {devAlreadyApplied && (
          <p className={classes.main_description__info}>
            You applied for this position
          </p>
        )}
        {!devAlreadyApplied && (
          <Button
            styles={classes.CTA_button}
            onClick={params.jobId === 'preview' ? addOfferHandler : CTAHandler}
          >
            {params.jobId === 'preview' ? 'Add offer' : 'Apply'}
          </Button>
        )}
        {loggedExactEmpl && (
          <Button styles={classes.delete_button} onClick={deleteHandler}>
            Delete offer
          </Button>
        )}
        {loggedExactEmpl && <AppliersList job={job} />}
      </div>
      <div className={classes.main_map}>
        {loadMap && (
          <Map
            single={true}
            width="100%"
            height="100%"
            latLngArray={[{ lat: job.lat!, lng: job.lng!, tech: job.mainField! }]}
          />
        )}
      </div>
    </div>
  );
};

export default JobDescription;
