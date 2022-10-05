import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/redux-hooks';
import { offersActions } from '../../../store/offers-slice';
import { useNavigate } from 'react-router-dom';
import useAddOffer from '../../../hooks/use-addOffer';
import Button from '../../../UI/Button';
import Card from '../../../UI/Card';
import FormCompanyInfo from './FormCompanyInfo';
import FormPositionInfo from './FormPositionInfo';
import FormOfferSalary from './FormOfferSalary';
import FormTechStack from './FormTechStack';
import FormDescription from './FormDescription';
import { Steps } from '../../../enums/enums';

import classes from './OfferForm.module.css';

const OfferForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addOffer = useAddOffer();

  const [formNumber, setFormNumber] = useState(0);
  const calculateWidth = (value: number) => {
    return ((value - 1) / 5) * 100;
  };
  const [step, setStep] = useState(Steps.InitialCard);
  const formStephandler = (desiredStep: Steps, action: string) => {
    if (action === 'increment') {
      setFormNumber((prevState) => prevState + 1);
    } else if (action === 'decrement') {
      setFormNumber((prevState) => prevState - 1);
    }
    setStep(desiredStep);
  };
  const startHandler = () => {
    formStephandler(Steps.CompanyInfo, 'increment');
    dispatch(offersActions.addOffer({}));
  };

  const previewHandler = () => {
    navigate('/jobdescr/preview');
  };

  const addOfferHandler = () => {
    addOffer();
    navigate('/');
  };
  const progressBar = (
    <div className={classes.progress_bar__container}>
      <p>Completed: {Math.round(calculateWidth(formNumber))}%</p>
      <div className={classes.progress_bar__background}>
        <div
          className={classes.progress_bar__fill}
          style={{ width: calculateWidth(formNumber).toString() + '%' }}
        />
      </div>
    </div>
  );
  let content;
  switch (step) {
    case 'initialCard':
      content = (
        <React.Fragment>
          <div className={classes.introduction_title}>
            <h1>Here you can add new offers.</h1>
          </div>
          <div className={classes.introduction__description}>
            <p>Our offer creator will take you through 5 steps.</p>
            <p>
              In the end you will be able to preview the effect of your work. In
              case of a mistake or a change of mind, you can always take a step
              back and implement any changes.
            </p>
            <p>Start when ready!</p>
          </div>
          <Button styles={classes.CTA_button} onClick={startHandler}>
            Start
          </Button>
        </React.Fragment>
      );
      break;
    case 'companyInfo':
      content = (
        <>
          {progressBar}
          <FormCompanyInfo
            onIncrement={formStephandler}
            onDecrement={formStephandler}
          />
        </>
      );
      break;
    case 'positionInfo':
      content = (
        <>
          {progressBar}
          <FormPositionInfo
            onIncrement={formStephandler}
            onDecrement={formStephandler}
          />
        </>
      );
      break;
    case 'offerSalary':
      content = (
        <>
          {progressBar}
          <FormOfferSalary
            onIncrement={formStephandler}
            onDecrement={formStephandler}
          />
        </>
      );
      break;
    case 'techStack':
      content = (
        <>
          {progressBar}
          <FormTechStack
            onIncrement={formStephandler}
            onDecrement={formStephandler}
          />
        </>
      );
      break;
    case 'description':
      content = (
        <>
          {progressBar}
          <FormDescription
            onIncrement={formStephandler}
            onDecrement={formStephandler}
          />
        </>
      );
      break;
    case 'finished':
      content = (
        <>
          {progressBar}
          <p>You finished all steps!</p>
          <div>
            <Button
              styles={classes.main_card__button}
              onClick={() => formStephandler(Steps.Description, 'decrement')}
            >
              Back
            </Button>
            <Button styles={classes.main_card__button} onClick={previewHandler}>
              Preview
            </Button>
            <Button
              styles={classes.main_card__addOffer}
              id="addOffer"
              onClick={addOfferHandler}
            >
              Add offer!
            </Button>
          </div>
        </>
      );
  }
  return <Card styles={classes.main_card}>{content}</Card>;
};

export default OfferForm;
