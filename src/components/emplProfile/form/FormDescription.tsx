import React from 'react';
import Button from '../../../UI/Button';
import { useAppSelector, useAppDispatch } from '../../../store/redux-hooks';
import { uiActions } from '../../../store/ui-slice';
import { Steps } from '../../../enums/enums';

import classes from './FormDescription.module.css'
import RichTextEditor from './RichTextEditor';

const FormDescription: React.FC<{
  onIncrement: (desiredStep: Steps, action: string) => void;
  onDecrement: (desiredStep: Steps, action: string) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const offerDescription = useAppSelector((state) => state.offers.addingOffer.description);
  const nextStephandler = (event: React.MouseEvent) => {
    if (offerDescription === undefined) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(uiActions.showInformation('Fill in the description for your offer!'))
    } else {
      props.onIncrement(Steps.Finished, 'increment');
    }
  };
  const previousStepHandler = (event: React.MouseEvent) => {
    props.onDecrement(Steps.TechStack, 'decrement');
  };
  return (
    <React.Fragment>
      <RichTextEditor />
      <div>
        <Button styles={classes.main_form__button} onClick={previousStepHandler}>Back</Button>
        <Button styles={classes.main_form__button} onClick={nextStephandler}>Next</Button>
      </div>
    </React.Fragment>
  );
};

export default FormDescription;
