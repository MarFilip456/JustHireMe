import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/redux-hooks';
import { offersActions } from '../../../store/offers-slice';
import { uiActions } from '../../../store/ui-slice';
import Button from '../../../UI/Button';

import classes from './OfferForm3.module.css';

const OfferForm3: React.FC<{
  onIncrement: (event: React.MouseEvent) => void;
  onDecrement: (event: React.MouseEvent) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offers.addingOffer);

  const previousStepHandler = (event: React.MouseEvent) => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          employment: {
            undisclosed,
            b2b: {
              allowB2b: b2b,
              maxSalary: b2bSalaryMaxRef.current?.value
                ? b2bSalaryMaxRef.current?.value
                : 0,
              minSalary: b2bSalaryMinRef.current?.value
                ? b2bSalaryMinRef.current?.value
                : 0
            },
            uop: {
              allowUop: uop,
              maxSalary: uopSalaryMaxRef.current?.value
                ? uopSalaryMaxRef.current?.value
                : 0,
              minSalary: uopSalaryMinRef.current?.value
                ? uopSalaryMinRef.current?.value
                : 0
            }
          }
        })
      )
    );
    props.onDecrement(event);
  };

  const nextStephandler = (event: React.MouseEvent) => {
    if (!undisclosed && !b2b && !uop) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(
        uiActions.showInforamtion('To proceed provide all information')
      );
    } else {
      dispatch(
        offersActions.addOffer(
          Object.assign({}, offer, {
            employment: {
              undisclosed,
              b2b: {
                allowB2b: b2b,
                maxSalary: b2bSalaryMaxRef.current?.value
                  ? b2bSalaryMaxRef.current?.value
                  : 0,
                minSalary: b2bSalaryMinRef.current?.value
                  ? b2bSalaryMinRef.current?.value
                  : 0
              },
              uop: {
                allowUop: uop,
                maxSalary: uopSalaryMaxRef.current?.value
                  ? uopSalaryMaxRef.current?.value
                  : 0,
                minSalary: uopSalaryMinRef.current?.value
                  ? uopSalaryMinRef.current?.value
                  : 0
              }
            }
          })
        )
      );
      props.onIncrement(event);
    }
  };

  const defaultAllowedUop = !!offer.employment?.uop?.minSalary;
  const defaultAllowedB2b = !!offer.employment?.b2b?.minSalary;
  const defaultUndisclosed = offer.employment?.undisclosed
    ? offer.employment.undisclosed
    : false;

  const [undisclosed, setUndisclosed] = useState(defaultUndisclosed);

  const [uop, setUop] = useState(defaultAllowedUop);
  const uopSalaryMinRef = useRef<HTMLInputElement>(null);
  const uopSalaryMaxRef = useRef<HTMLInputElement>(null);

  const [b2b, setB2b] = useState(defaultAllowedB2b);
  const b2bSalaryMinRef = useRef<HTMLInputElement>(null);
  const b2bSalaryMaxRef = useRef<HTMLInputElement>(null);

  const setUndisclosedTrueHandler = () => {
    setUndisclosed(true);
    setUop(false);
    setB2b(false);
  };
  const setUndisclosedFalseHandler = () => {
    setUndisclosed(false);
  };

  const setUopHandler = () => {
    setUop((prevState) => !prevState);
  };
  const setB2bHandler = () => {
    setB2b((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <form className={classes.main_form}>
        <p>Undisclosed salary?</p>
        <div>
          <label htmlFor="undisclosed">Yes</label>
          <input
            name="undisclosed"
            type="radio"
            value="yes"
            onChange={setUndisclosedTrueHandler}
            defaultChecked={undisclosed}
          />
        </div>
        <div>
          <label htmlFor="undisclosed">No</label>
          <input
            name="undisclosed"
            type="radio"
            value="no"
            onChange={setUndisclosedFalseHandler}
            defaultChecked={!undisclosed}
          />
        </div>

        {!undisclosed && (
          <div>
            <div>
              <label htmlFor="setUop">Set salary range for UoP</label>
              <input
                name="setUop"
                type="checkbox"
                onChange={setUopHandler}
                defaultChecked={uop}
              />
            </div>
            {uop && (
              <div className={classes.flex_container}>
                <label htmlFor="uopSalaryMin">Minimum salary</label>
                <input
                  name="uopSalaryMin"
                  type="number"
                  step={1000}
                  ref={uopSalaryMinRef}
                  defaultValue={
                    offer.employment?.uop ? offer.employment.uop.minSalary : 0
                  }
                />
                <label htmlFor="uopSalaryMax">Maximum salary</label>
                <input
                  name="uopSalaryMax"
                  type="number"
                  ref={uopSalaryMaxRef}
                  defaultValue={
                    offer.employment?.uop ? offer.employment.uop.maxSalary : 0
                  }
                />
              </div>
            )}
            <label htmlFor="setB2b">Set salary range for B2B</label>
            <input
              name="setB2b"
              type="checkbox"
              onChange={setB2bHandler}
              defaultChecked={b2b}
            />
            {b2b && (
              <div className={classes.flex_container}>
                <label htmlFor="b2bSalaryMin">Minimum salary</label>
                <input
                  name="b2bSalaryMin"
                  type="number"
                  ref={b2bSalaryMinRef}
                  defaultValue={
                    offer.employment?.b2b ? offer.employment.b2b.minSalary : 0
                  }
                />
                <label htmlFor="b2bSalaryMax">Maximum salary</label>
                <input
                  name="b2bSalaryMax"
                  type="number"
                  ref={b2bSalaryMaxRef}
                  defaultValue={
                    offer.employment?.b2b ? offer.employment.b2b.maxSalary : 0
                  }
                />
              </div>
            )}
          </div>
        )}
      </form>
      <div>
        <Button
          styles={classes.main_form__button}
          onClick={previousStepHandler}
        >
          Back
        </Button>
        <Button styles={classes.main_form__button} onClick={nextStephandler}>
          Next
        </Button>
      </div>
    </React.Fragment>
  );
};

export default OfferForm3;
