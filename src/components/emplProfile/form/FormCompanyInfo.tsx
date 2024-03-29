/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/redux-hooks';
import { offersActions } from '../../../store/offers-slice';
import Button from '../../../UI/Button';
import axios from 'axios';

import classes from './FormCompanyInfo.module.css';
import { uiActions } from '../../../store/ui-slice';
import { Steps } from '../../../enums/enums';

const FormCompanyInfo: React.FC<{
  onIncrement: (desiredStep: Steps, action: string) => void;
  onDecrement: (desiredStep: Steps, action: string) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offers.addingOffer);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const companySizeRef = useRef<HTMLInputElement>(null);
  const companyLocationRef = useRef<HTMLInputElement>(null);
  const companyRemote1Ref = useRef<HTMLInputElement>(null);
  const companyRemote2Ref = useRef<HTMLInputElement>(null);
  const companyRemote3Ref = useRef<HTMLInputElement>(null);
  const companyLogoRef = useRef<HTMLInputElement>(null);
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
  const onChangeRemoteHandler = () => {
    if (companyRemote1Ref.current!.checked) {
      dispatch(
        offersActions.addOffer(
          Object.assign({}, offer, {
            fullyRemote: companyRemote1Ref.current!.checked
          })
        )
      );
    } else if (companyRemote2Ref.current!.checked) {
      dispatch(
        offersActions.addOffer(
          Object.assign({}, offer, {
            fullyRemote: !companyRemote2Ref.current!.checked
          })
        )
      );
    } else if (companyRemote3Ref.current!.checked) {
      dispatch(
        offersActions.addOffer(
          Object.assign({}, offer, {
            fullyRemote: undefined
          })
        )
      );
    }
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
    dispatch(offersActions.addOffer(Object.assign({}, offer, {})));
    props.onDecrement(Steps.InitialCard, 'decrement');
  };

  const nextStepHandler = (event: React.MouseEvent) => {
    if (
      offer.location &&
      offer.companyName &&
      offer.companySize &&
      offer.logo
    ) {
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
          dispatch(uiActions.changeInformationPopup());
          dispatch(uiActions.setInformationError());
          dispatch(
            uiActions.showInformation(
              `Could not find entered location!: ${error.message}`
            )
          );
        })
        .finally(() => {
          if (offer.lat && offer.lng) {
            props.onIncrement(Steps.PositionInfo, 'increment');
          }
        });
    } else {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(
        uiActions.showInformation('To proceed provide all of the above')
      );
    }
  };

  return (
    <Fragment>
      <form className={classes.main_form}>
        <label htmlFor="companyName">Company's name</label>
        <input
          name="companyName"
          type="text"
          defaultValue={offer.companyName}
          ref={companyNameRef}
          onBlur={onBlurCompanyNameHandler}
          placeholder={'Example Sp. z o.o.'}
        />
        <label htmlFor="companySize">Company's size</label>
        <input
          name="companySize"
          type="number"
          defaultValue={offer.companySize}
          ref={companySizeRef}
          onBlur={onBlurCompanySizeHandler}
          placeholder={'Number of people employed'}
        />
        <label htmlFor="location">Office location</label>
        <input
          name="location"
          type="text"
          defaultValue={offer.location}
          placeholder={'Country, City, Street'}
          ref={companyLocationRef}
          onBlur={onBlurLocationHandler}
        />
        <div className={classes.remote_div}>
          <p>Job can be done remotely?</p>
          <div className={classes.remote_div__labels}>
            <div>
              <label className={classes.label_option} htmlFor="remote">
                Fully
              </label>
              <input
                name="remote"
                type="radio"
                defaultChecked={offer.fullyRemote === true}
                ref={companyRemote1Ref}
                onChange={onChangeRemoteHandler}
              />
            </div>
            <div>
              <label className={classes.label_option} htmlFor="remote">
                Partly
              </label>
              <input
                name="remote"
                type="radio"
                defaultChecked={offer.fullyRemote === false}
                ref={companyRemote2Ref}
                onChange={onChangeRemoteHandler}
              />
            </div>
            <div>
              <label className={classes.label_option} htmlFor="remote">
                Not at all
              </label>
              <input
                name="remote"
                type="radio"
                defaultChecked={offer.fullyRemote === undefined}
                ref={companyRemote3Ref}
                onChange={onChangeRemoteHandler}
              />
            </div>
          </div>
        </div>
        <label htmlFor="logo">URL to your company's logo</label>
        <input
          name="logo"
          type="text"
          defaultValue={offer.logo}
          ref={companyLogoRef}
          onBlur={onBlurLogoUrlHandler}
          placeholder={'http://localhost:3000/companyLogo.png'}
        />
      </form>
      <div>
        <Button
          styles={classes.main_form__button}
          onClick={previousStepHandler}
        >
          Leave
        </Button>
        <Button styles={classes.main_form__button} onClick={nextStepHandler}>
          {offer.lat && offer.lng ? 'Next' : 'Check entered location'}
        </Button>
      </div>
    </Fragment>
  );
};

export default FormCompanyInfo;
