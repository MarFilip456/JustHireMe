import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { offerObject } from '../../store/offers-slice';
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
  const { job } = props;
  const isLoggedIn = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state) => state.ui.isDev);
  const navigate = useNavigate();
  const params = useParams<{ jobId: string }>();
  const dispatch = useAppDispatch();
  const actualApply = useApply(params.jobId!);
  const loggedUser = localStorage.getItem('justHireMeId');
  const loggedExactEmpl = job.addedBy === loggedUser;
  const loggedSomeEmpl = !isDev && isLoggedIn;
  const loggedDev = isDev && isLoggedIn;

  // checking if user has already applied for posiion
  const [devAlreadyApplied, setDevAlreadyApplied] = useState(false);

  useEffect(() => {
    let i: number;
    for (i = 0; i < job.appliers!.length; i++) {
      if (job.appliers![i].id === loggedUser) {
        setDevAlreadyApplied(true);
      }
    }
  }, [job.appliers, loggedUser]);

  // aply handler
  const CTAHandler = (event: React.MouseEvent) => {
    if (loggedDev) {
      actualApply();
      setDevAlreadyApplied(true);
    } else if (loggedSomeEmpl) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(uiActions.showInforamtion('As an employer you cannot apply!'));
    } else {
      navigate('/login');
    }
  };

  const deleteHandler = () => {
    dispatch(uiActions.changeDeletePopup());
  };

  return (
    <div className={classes.main}>
      <div className={classes.main_description}>
        <JobHeader job={job} />
        <Rectangles job={job} />
        <div className={classes.description_map}>
          {job && (
            <Map
              single={true}
              width="100%"
              height="100%"
              latLngArray={[{ lat: job.lat!, lng: job.lng! }]}
            />
          )}
        </div>
        <TechStack job={job} />
        <Description job={job} />
        {devAlreadyApplied && <p>You applied for this position</p>}
        {!devAlreadyApplied && (
          <Button styles={classes.CTA_button} onClick={CTAHandler}>
            Apply
          </Button>
        )}
        {loggedExactEmpl && (
          <Button styles={classes.delete_button} onClick={deleteHandler}>Delete offer</Button>
        )}
        {loggedExactEmpl && <AppliersList job={job} />}
      </div>
      <div className={classes.main_map}>
        {job && (
          <Map
            single={true}
            width="100%"
            height="100%"
            latLngArray={[{ lat: job.lat!, lng: job.lng! }]}
          />
        )}
      </div>
    </div>
  );
};

export default JobDescription;
