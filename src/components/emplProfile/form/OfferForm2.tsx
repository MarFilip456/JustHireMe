import React, { Fragment, useRef } from 'react';
import Button from '../../../UI/Button';
import { useAppSelector, useAppDispatch } from '../../../store/redux-hooks';
import { offersActions } from '../../../store/offers-slice';

import classes from './OfferForm2.module.css';

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
          mainLang: mainLangRef.current!.value
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
          mainLang: mainLangRef.current!.value
        })
      )
    );
    props.onIncrement(event);
  };

  const expLevelArray = ['Junior', 'Mid', 'Senior', 'Expert'];
  const mainLangArray = [
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

  const jobPositionRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLSelectElement>(null);
  const mainLangRef = useRef<HTMLSelectElement>(null);

  return (
    <Fragment>
      <form className={classes.main_form}>
        <label htmlFor="jobPosition">Position</label>
        <input
          name="jobPosition"
          type="text"
          defaultValue={offer.jobPosition}
          ref={jobPositionRef}
        />
        <label htmlFor="mainLang">Main language</label>
        <select name="mainLang" ref={mainLangRef} defaultValue={offer.mainLang}>
          {mainLangArray.map((mainLang) => (
            <option key={mainLangArray.indexOf(mainLang)} value={mainLang}>
              {mainLang}
            </option>
          ))}
        </select>
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
      </form>
      <div>
        <Button onClick={previousStepHandler}>Back</Button>
        <Button onClick={nextStephandler}>Next</Button>
      </div>
    </Fragment>
  );
};

export default OfferForm2;
