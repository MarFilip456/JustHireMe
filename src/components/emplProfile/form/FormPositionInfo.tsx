import React, { Fragment, useRef } from 'react';
import Button from '../../../UI/Button';
import { useAppSelector, useAppDispatch } from '../../../store/redux-hooks';
import { offersActions } from '../../../store/offers-slice';
import { uiActions } from '../../../store/ui-slice';
import { Steps } from '../../../enums/enums';

import classes from './FormPositionInfo.module.css';

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

const FormPositionInfo: React.FC<{
  onIncrement: (desiredStep: Steps, action: string) => void;
  onDecrement: (desiredStep: Steps, action: string) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offers.addingOffer);

  const onBlurPositionHandler = () => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          jobPosition: jobPositionRef.current!.value
        })
      )
    );
  };

  const previousStepHandler = (event: React.MouseEvent) => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          expLevel: experienceRef.current!.value,
          mainField: mainFieldRef.current!.value
        })
      )
    );
    props.onDecrement(Steps.CompanyInfo, 'decrement');
  };

  const nextStephandler = (event: React.MouseEvent) => {
    if (offer.jobPosition) {
      dispatch(
        offersActions.addOffer(
          Object.assign({}, offer, {
            expLevel: experienceRef.current!.value,
            mainField: mainFieldRef.current!.value
          })
        )
      );
      props.onIncrement(Steps.OfferSalary, 'increment');
    } else {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(
        uiActions.showInformation('To proceed provide all of the above')
      );
    }
  };

  const expLevelArray = ['Junior', 'Mid', 'Senior', 'Expert'];

  const jobPositionRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLSelectElement>(null);
  const mainFieldRef = useRef<HTMLSelectElement>(null);

  return (
    <Fragment>
      <form className={classes.main_form}>
        <div className={classes.main_form__container}>
          <label htmlFor="jobPosition">Position</label>
          <input
            name="jobPosition"
            type="text"
            defaultValue={offer.jobPosition}
            ref={jobPositionRef}
            onBlur={onBlurPositionHandler}
          />
        </div>
        <div className={classes.main_form__container}>
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
        <div className={classes.main_form__container}>
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
    </Fragment>
  );
};

export default FormPositionInfo;
