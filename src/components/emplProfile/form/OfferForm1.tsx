import React, { Fragment, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/redux-hooks";
import { offersActions } from "../../../store/offers-slice";
import Button from "../../../UI/Button";

const OfferForm1: React.FC<{
  onIncrement: (event: React.MouseEvent) => void;
  onDecrement: (event: React.MouseEvent) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offers.addingOffer);

  const previousStepHandler = (event: React.MouseEvent) => {
    props.onDecrement(event);
  };
  
  const nextStepHandler = (event: React.MouseEvent) => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          companyName: companyNameRef.current!.value,
          companySize: companySizeRef.current!.value,
          location: companyLocationRef.current!.value,
          logo: companyLogoRef.current!.value,
        })
      )
    );
    props.onIncrement(event);
  };

  const companyNameRef = useRef<HTMLInputElement>(null);
  const companySizeRef = useRef<HTMLInputElement>(null);
  const companyLocationRef = useRef<HTMLInputElement>(null);
  const companyLogoRef = useRef<HTMLInputElement>(null);

  return (
    <Fragment>
      <p>First form</p>
      <form>
        <label htmlFor="companyName">Company's name</label>
        <input
          name="companyName"
          type="text"
          defaultValue={offer.companyName}
          ref={companyNameRef}
        />
        <label htmlFor="companySize">
          Company's size (number of people employed)
        </label>
        <input
          name="companySize"
          type="number"
          defaultValue={offer.companySize}
          ref={companySizeRef}
        />
        <label htmlFor="location">Office location</label>
        <input
          name="location"
          type="text"
          defaultValue={offer.location}
          ref={companyLocationRef}
        />
        <label htmlFor="logo">URL to your company's logo</label>
        <input
          name="logo"
          type="text"
          defaultValue={offer.logo}
          ref={companyLogoRef}
        />
      </form>
      <Button onClick={previousStepHandler}>Back</Button>
      <Button onClick={nextStepHandler}>Next</Button>
    </Fragment>
  );
};

export default OfferForm1;
