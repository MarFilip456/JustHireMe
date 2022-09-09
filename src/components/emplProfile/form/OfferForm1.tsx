import React, { Fragment, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/redux-hooks';
import { offersActions } from '../../../store/offers-slice';
import Button from '../../../UI/Button';
import axios from 'axios';

import classes from './OfferForm1.module.css';

const OfferForm1: React.FC<{
  onIncrement: (event: React.MouseEvent) => void;
  onDecrement: (event: React.MouseEvent) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offers.addingOffer);
  const myAPIKey = process.env.REACT_APP_MAP_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    offer.location!
  )}&key=${myAPIKey}`;
  const onBlurCompanyNameHandler = () => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          companyName: companyNameRef.current!.value
        })
      )
    );
  };
  const onBlurCompanySizeHandler = () => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          companySize: companySizeRef.current!.value
        })
      )
    );
  };
  const onBlurLocationHandler = () => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          location: companyLocationRef.current!.value
        })
      )
    );
  };
  const onBlurLogoUrlHandler = () => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          logo: companyLogoRef.current!.value
        })
      )
    );
  };
  const previousStepHandler = (event: React.MouseEvent) => {
    axios
      .get(url)
      .then((response) => {
        const responseData = response.data;
        dispatch(
          offersActions.addOffer(
            Object.assign({}, offer, {
              lat: responseData.results[0].geometry.location.lat,
              lng: responseData.results[0].geometry.location.lng
            })
          )
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
    props.onDecrement(event);
  };

  const nextStepHandler = (event: React.MouseEvent) => {
    axios
      .get(url)
      .then((response) => {
        const responseData = response.data;
        dispatch(
          offersActions.addOffer(
            Object.assign({}, offer, {
              lat: responseData.results[0].geometry.location.lat,
              lng: responseData.results[0].geometry.location.lng
            })
          )
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
    props.onIncrement(event);
  };

  const companyNameRef = useRef<HTMLInputElement>(null);
  const companySizeRef = useRef<HTMLInputElement>(null);
  const companyLocationRef = useRef<HTMLInputElement>(null);
  const companyLogoRef = useRef<HTMLInputElement>(null);

  return (
    <Fragment>
      <form className={classes.main_form}>
        <label htmlFor="companyName">Company`&apos`s name</label>
        <input
          name="companyName"
          type="text"
          defaultValue={offer.companyName}
          ref={companyNameRef}
          onBlur={onBlurCompanyNameHandler}
        />
        <label htmlFor="companySize">
          Company`&apos`s size <span>(number of people employed)</span>
        </label>
        <input
          name="companySize"
          type="number"
          defaultValue={offer.companySize}
          ref={companySizeRef}
          onBlur={onBlurCompanySizeHandler}
        />
        <label htmlFor="location">
          Office location <span>(Country, City, Street)</span>{' '}
        </label>
        <input
          name="location"
          type="text"
          defaultValue={offer.location}
          ref={companyLocationRef}
          onBlur={onBlurLocationHandler}
        />
        <label htmlFor="logo">URL to your company`&apos`s logo</label>
        <input
          name="logo"
          type="text"
          defaultValue={offer.logo}
          ref={companyLogoRef}
          onBlur={onBlurLogoUrlHandler}
        />
      </form>
      <div>
        <Button onClick={previousStepHandler}>Leave</Button>
        <Button onClick={nextStepHandler}>Next</Button>
      </div>
    </Fragment>
  );
};

export default OfferForm1;
