import JobsList from '../components/job/JobsList';
import classes from './MainPage.module.css';
import Button from '../UI/Button';
import Map from '../components/map/Map';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/redux-hooks';
import { useQuery } from 'react-query';
import { offerObject } from '../store/offers-slice';
import { uiActions } from '../store/ui-slice';
import axios from 'axios';
import FilterButton from '../components/filters/FilterButton';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const [mapIsShown, setMapIsWhown] = useState(false);
  const showMapHandler = () => {
    setMapIsWhown((prevState) => !prevState);
  };
  const latLngArray: { lat: number; lng: number }[] = [];
  const splitDivClasses = mapIsShown
    ? classes.letMapVisible
    : classes.letListVisible;
  const [offers, setOffers] = useState<offerObject[]>([]);
  const queryObject = useAppSelector((state) => state.offers.queries);
  const getOffers = () => {
    return axios
      .get(`${process.env.REACT_APP_API_ADRESS}/offer`, { params: queryObject })
      .catch((error) => {
        dispatch(uiActions.changeInformationPopup());
        dispatch(uiActions.setInformationError());
        dispatch(uiActions.showInformation(`Could not fetch data! ${error}`));
      });
  };
  const { data, isLoading, isError, refetch } = useQuery('offers', getOffers);
  useEffect(() => {
    refetch()
  }, [queryObject]);
  useEffect(() => {
    if (data !== undefined) {
      setOffers(data.data);
    }
    if (isError) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(uiActions.showInformation('Could not fetch data!'));
    }
  }, [data]);
  offers.forEach((offer) => {
    latLngArray.push({ lat: offer.lat!, lng: offer.lng! });
  });

  return (
    <div className={classes.mainPage}>
      <FilterButton />
      <div className={splitDivClasses}>
        <JobsList data={offers} isLoading={isLoading} />
        <Map
          width="100%"
          height="100%"
          latLngArray={latLngArray}
          single={false}
        />
      </div>
      <div className={classes.bottomMap}>
        <Button styles={classes.bottomMap__button} onClick={showMapHandler}>
          <img
            className={classes.bottomMap__button_img}
            alt="map_image"
            src="https://thumbs.dreamstime.com/b/white-earth-globe-isolated-black-background-illustration-white-earth-globe-isolated-black-background-166294648.jpg"
          />
          <p className={classes.bottomMap__button_p}>
            {mapIsShown ? 'List' : 'Map'}
          </p>
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
