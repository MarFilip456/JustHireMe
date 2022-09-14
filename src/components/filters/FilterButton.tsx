import Button from '../../UI/Button';
import { useAppDispatch } from '../../store/redux-hooks';
import { uiActions } from '../../store/ui-slice';

import classes from './FilterButton.module.css';

const FilterButton = () => {
  const dispatch = useAppDispatch();
  const showFilterModalHandler = () => {
    dispatch(uiActions.changeVisFilter());
  };

  return (
    <Button styles={classes.filter_button} onClick={showFilterModalHandler}>
      Filters
    </Button>
  );
};

export default FilterButton;
