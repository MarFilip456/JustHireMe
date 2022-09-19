import { useState, useEffect } from 'react';
import JobsList from '../components/job/JobsList';
import { offerObject } from '../store/offers-slice';
import { useQuery } from 'react-query';
import { useAppDispatch } from '../store/redux-hooks';
import { uiActions } from '../store/ui-slice';
import axios from 'axios';

import classes from './EmplPage.module.css';

const EmplPage = () => {
  const dispatch = useAppDispatch();
  const empId = localStorage.getItem('justHireMeId')!;
  const [offers, setOffers] = useState<offerObject[]>([]);
  const getOffers = () => {
    return axios
      .get(`${process.env.REACT_APP_API_ADRESS}/offer`)
      .catch((error) => {
        dispatch(uiActions.changeInformationPopup());
        dispatch(uiActions.setInformationError());
        dispatch(uiActions.showInformation(`Could not fetch data! ${error}`));
      });
  };
  const { data, isLoading, isError } = useQuery('offers', getOffers);
  useEffect(() => {
    if (data !== undefined) {
      const addedOffers: offerObject[] = [];
      let i: number;
      for (i = 0; i < data.data.length; i++) {
        if (data.data[i].addedBy === empId) {
          addedOffers.push(data.data[i]);
        }
      }
      setOffers(addedOffers);
    }
    if (isError) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.showInformation('Couldt not fetch data!'))
    }
  }, [data]);
  return (
    <div className={classes.main} >
      <h1>Offers added by you:</h1>
      <JobsList empId={empId} data={offers} isLoading={isLoading} />
    </div>
  );
};
export default EmplPage;
