import Card from './Card';
import Button from './Button';
import { useAppDispatch, useAppSelector } from '../store/redux-hooks';
import { uiActions } from '../store/ui-slice';

import classes from './InformationPopup.module.css';
import Modal from '../components/modal/Modal';

const InformationPopup = () => {
  const dispatch = useAppDispatch();
  const information = useAppSelector((state) => state.ui.information);
  const confirmHandler = () => {
    dispatch(uiActions.changeInformationPopup());
  };

  return (
    <Modal onClick={confirmHandler}>
      <Card styles={classes.information_card}>
        <p>{information}</p>
        <Button onClick={confirmHandler}>OK</Button>
      </Card>
    </Modal>
  );
};

export default InformationPopup;
