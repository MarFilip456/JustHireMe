import Filters from '../components/filters/Filters';
import JobsList from '../components/job/JobsList';
import classes from './MainPage.module.css';
import Button from '../UI/Button';
import Map from '../components/map/Map';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/redux-hooks';
import { useQuery } from 'react-query';
import { offerObject } from '../store/offers-slice';
import { getOffers } from '../api/Api';
import { uiActions } from '../store/ui-slice';

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
  // have to clear cache and reload
  const { data, isLoading, isError } = useQuery('offers', getOffers);
  useEffect(() => {
    if (data !== undefined) {
      setOffers(data.data);
    }
    if (isError) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.showInforamtion('Could not fetch data!'));
    }
  }, [data]);
  offers.forEach((offer) => {
    latLngArray.push({ lat: offer.lat!, lng: offer.lng! });
  });

  return (
    <div className={classes.mainPage}>
      <Filters />
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
