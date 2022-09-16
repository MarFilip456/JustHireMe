import React from 'react';
import Button from '../../../UI/Button';
import { useAppSelector, useAppDispatch } from '../../../store/redux-hooks';
import { uiActions } from '../../../store/ui-slice';

import classes from './OfferForm5.module.css'
import RichTextEditor from './RichTextEditor';

const OfferForm5: React.FC<{
  onIncrement: (event: React.MouseEvent) => void;
  onDecrement: (event: React.MouseEvent) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const offerDescription = useAppSelector((state) => state.offers.addingOffer.description);
  const nextStephandler = (event: React.MouseEvent) => {
    if (offerDescription === undefined) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(uiActions.showInforamtion('Fill in the description for your offer!'))
    } else {
      props.onIncrement(event);
    }
  };
  const previousStepHandler = (event: React.MouseEvent) => {
    props.onDecrement(event);
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

export default OfferForm5;
