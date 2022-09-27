import JobsList from '../components/job/JobsList';
import classes from './MainPage.module.css';
import Button from '../UI/Button';
import Map from '../components/map/Map';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/redux-hooks';
import { useQuery } from 'react-query';
import { offerObject, offersActions } from '../store/offers-slice';
import { uiActions } from '../store/ui-slice';
import axios from 'axios';
import FilterButton from '../components/filters/FilterButton';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const [mapIsShown, setMapIsWhown] = useState(false);
  const showMapHandler = () => {
    setMapIsWhown((prevState) => !prevState);
  };
  const latLngArray: { lat: number; lng: number; tech: string }[] = [];
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
    refetch();
  }, [queryObject]);

  const withSalaryHandler = () => {
    setAllOffers(false);
    dispatch(
      offersActions.setQueryObject(
        Object.assign({}, queryObject, { undisclosed: 'false' })
      )
    );
  };
  const allOffersHandler = () => {
    setAllOffers(true);
    dispatch(
      offersActions.setQueryObject(
        Object.assign({}, queryObject, { undisclosed: undefined })
      )
    );
  };
  useEffect(() => {
    if (data !== undefined) {
      setOffers(data.data);
    }
    if (isError) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(uiActions.showInformation('Could not fetch data!'));
    }
    if (queryObject.undisclosed !== undefined) {
      setAllOffers(false)
    }
  }, [data]);
  offers.forEach((offer) => {
    latLngArray.push({
      lat: offer.lat!,
      lng: offer.lng!,
      tech: offer.mainField!
    });
  });
  const [allOffers, setAllOffers] = useState(true);
  return (
    <div className={classes.mainPage}>
      <FilterButton />
      <div className={splitDivClasses}>
        <div className={classes.mainPage_filterOffers}>
          <div className={classes.list_transition}>
            <div
              className={
                allOffers ? classes.transitionWhite : classes.transitionDark
              }
              onClick={withSalaryHandler}
            >
              With salary
            </div>
            <div
              className={
                allOffers ? classes.transitionDark : classes.transitionWhite
              }
              onClick={allOffersHandler}
            >
              All offers { allOffers && <span>{offers && offers.length} offers</span>}
            </div>
            <div className={classes.whiteFiller} />
            <div className={classes.darkFiller} />
          </div>
          <JobsList data={offers} isLoading={isLoading} />
        </div>

        {offers && !isLoading && (
          <Map
            width="100%"
            height="100%"
            latLngArray={latLngArray}
            single={false}
          />
        )}
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
