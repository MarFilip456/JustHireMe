import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/redux-hooks';
import { offersActions, techStackType } from '../../../store/offers-slice';
import Button from '../../../UI/Button';

import classes from './OfferForm4.module.css';

const OfferForm4: React.FC<{
  onIncrement: (event: React.MouseEvent) => void;
  onDecrement: (event: React.MouseEvent) => void;
}> = (props) => {
  const dispatch = useAppDispatch();

  const offer = useAppSelector((state) => state.offers.addingOffer);

  const previousStepHandler = (event: React.MouseEvent) => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          techStack: stackArray
        })
      )
    );
    props.onDecrement(event);
  };

  const nextStephandler = (event: React.MouseEvent) => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          techStack: stackArray
        })
      )
    );
    props.onIncrement(event);
  };

  const [techLang, setTechLang] = useState('');
  const [techValue, setTechValue] = useState('nice to have');

  const techLangHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTechLang(event.target.value);
  };

  const techValueHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTechValue(event.target.value);
  };

  const [stackArray, setStackArray] = useState<techStackType[]>(
    offer.techStack ? offer.techStack : []
  );

  const addtechStackhandler = (techLang: string) => {
    if (stackArray.length > 7) {
      return;
    }
    for (let i = 0; i < stackArray.length; i++) {
      if (stackArray[i].id === techLang) {
        return;
      }
    }
    setStackArray([
      ...stackArray,
      {
        id: techLang,
        lang: techLang,
        value: techValue
      }
    ]);
    setTechLang('');
    setTechValue('nice to have');
  };

  const deleteTechStackHandler = (id: string) => {
    setStackArray(stackArray.filter((stack) => stack.id !== id));
  };

  return (
    <React.Fragment>
      <div className={classes.tech_stack__container}>
        <div className={classes.tech_stack__form}>
          <p>Required:</p>
          <div className={classes.tech_stack__form_input}>
            <label htmlFor="lang">skill</label>
            <input
              type="text"
              name="lang"
              value={techLang}
              onChange={techLangHandler}
              placeholder={'required skill...'}
            />
          </div>
          <div className={classes.tech_stack__form_input}>
            <label htmlFor="value">knowledge</label>
            <select name="value" value={techValue} onChange={techValueHandler}>
              <option value="nice to have">nice to have</option>
              <option value="junior">junior</option>
              <option value="regular">regular</option>
              <option value="advanced">advanced</option>
              <option value="master">master</option>
            </select>
          </div>
        </div>
        <Button
          styles={classes.tech_stack__button}
          onClick={
            techLang.length > 0
              ? () => addtechStackhandler(techLang)
              : () => {
                  console.log('add fallback function');
                }
          }
        >
          Add
        </Button>
        <div className={classes.tech_stack__stack}>
          {stackArray.length > 0 &&
            stackArray.map((tech) => (
              <div
                key={`${tech.lang}_${tech.value}`}
                id={tech.id}
                className={classes.tech_stack__single}
              >
                <div className={classes.tech_stack__description}>
                  <p className={classes.description_name}>{tech.lang}</p>
                  <p className={classes.description_value}>{tech.value}</p>
                </div>
                <Button onClick={() => deleteTechStackHandler(tech.id)}>
                  X
                </Button>
              </div>
            ))}
        </div>
      </div>
      <div>
        <Button styles={classes.main_form__button} onClick={previousStepHandler}>Back</Button>
        <Button styles={classes.main_form__button} onClick={nextStephandler}>Next</Button>
      </div>
    </React.Fragment>
  );
};

export default OfferForm4;
