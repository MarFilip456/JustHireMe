import React, { Fragment, useRef } from 'react';
import Button from '../../../UI/Button';
import { useAppSelector, useAppDispatch } from '../../../store/redux-hooks';
import { offersActions } from '../../../store/offers-slice';

import classes from './OfferForm2.module.css';

export const mainFieldArray = [
  'JS',
  'HTML',
  'PHP',
  'Ruby',
  'Python',
  'Java',
  '.Net',
  'Scala',
  'C',
  'Mobile',
  'Testing',
  'DevOps',
  'Admin',
  'UX/UI',
  'PM',
  'Game',
  'Analytics',
  'Security',
  'Data',
  'Go',
  'Support',
  'ERP',
  'Architecture',
  'Other'
];

const OfferForm2: React.FC<{
  onIncrement: (event: React.MouseEvent) => void;
  onDecrement: (event: React.MouseEvent) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offers.addingOffer);

  const previousStepHandler = (event: React.MouseEvent) => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          jobPosition: jobPositionRef.current!.value,
          expLevel: experienceRef.current!.value,
          mainField: mainFieldRef.current!.value
        })
      )
    );
    props.onDecrement(event);
  };

  const nextStephandler = (event: React.MouseEvent) => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          jobPosition: jobPositionRef.current!.value,
          expLevel: experienceRef.current!.value,
          mainField: mainFieldRef.current!.value
        })
      )
    );
    props.onIncrement(event);
  };

  const expLevelArray = ['Junior', 'Mid', 'Senior', 'Expert'];

  const jobPositionRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLSelectElement>(null);
  const mainFieldRef = useRef<HTMLSelectElement>(null);

  return (
    <Fragment>
      <form className={classes.main_form}>
        <div className={classes.main_form__container} >
          <label htmlFor="jobPosition">Position</label>
          <input
            name="jobPosition"
            type="text"
            defaultValue={offer.jobPosition}
            ref={jobPositionRef}
          />
        </div>
        <div className={classes.main_form__container} >
          <label htmlFor="mainLang">Main language</label>
          <select
            name="mainLang"
            ref={mainFieldRef}
            defaultValue={offer.mainField}
          >
            {mainFieldArray.map((mainField) => (
              <option key={mainFieldArray.indexOf(mainField)} value={mainField}>
                {mainField}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.main_form__container} >
          <label htmlFor="experience">Experience</label>
          <select
            name="experience"
            ref={experienceRef}
            defaultValue={offer.expLevel}
          >
            {expLevelArray.map((expLevel) => (
              <option key={expLevelArray.indexOf(expLevel)} value={expLevel}>
                {expLevel}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div>
        <Button styles={classes.main_form__button} onClick={previousStepHandler}>Back</Button>
        <Button styles={classes.main_form__button} onClick={nextStephandler}>Next</Button>
      </div>
    </Fragment>
  );
};

export default OfferForm2;
