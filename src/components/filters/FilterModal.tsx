import Button from '../../UI/Button';
import Card from '../../UI/Card';
import Filters from './Filters';
import { useAppDispatch } from '../../store/redux-hooks';
import { uiActions } from '../../store/ui-slice';

import classes from './FilterModal.module.css';
import Modal from '../modal/Modal';

const FilterModal = () => {
  const dispatch = useAppDispatch();
  const showFilterModalHandler = () => {
    dispatch(uiActions.changeVisFilter());
  };
  return (
    <Modal onClick={showFilterModalHandler} >
      <Card styles={classes.main}>
        <Filters />
        <Button styles={classes.main_button} onClick={showFilterModalHandler}>Close</Button>
      </Card>
    </Modal>
  );
};

export default FilterModal;
