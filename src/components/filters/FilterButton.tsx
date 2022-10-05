import Button from '../../UI/Button';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { uiActions } from '../../store/ui-slice';
import { offersActions } from '../../store/offers-slice';
import { mainFieldArray } from '../emplProfile/form/FormPositionInfo';

import classes from './FilterButton.module.css';
import React, { useEffect } from 'react';
import { TechArray } from './techField/TechField';

const FilterButton = () => {
  const dispatch = useAppDispatch();
  const showFilterModalHandler = () => {
    dispatch(uiActions.changeVisFilter());
  };

  const childrenArray = document.getElementById('techContainer')?.children;
  const savedQueryObject = useAppSelector((state) => state.offers.queries);
  const techClickHandler = (event: React.MouseEvent) => {
    if (savedQueryObject.mainField === event.currentTarget.id) {
      dispatch(
        offersActions.setQueryObject(
          Object.assign({}, savedQueryObject, { mainField: undefined })
        )
      );
      for (let i = 0; i < childrenArray!.length; i++) {
        childrenArray![i].classList.remove(classes.grayscale);
      }
    } else {
      for (let i = 0; i < childrenArray!.length; i++) {
        childrenArray![i].classList.remove(classes.active);
        childrenArray![i].classList.add(classes.grayscale);
      }
      event.currentTarget.classList.remove(classes.grayscale);
      dispatch(
        offersActions.setQueryObject(
          Object.assign({}, savedQueryObject, {
            mainField: event.currentTarget.id
          })
        )
      );
    }
    event.currentTarget.classList.toggle(classes.active);
  };
  useEffect(() => {
    if (savedQueryObject.mainField === undefined && childrenArray) {
      for (let i = 0; i < childrenArray!.length; i++) {
        childrenArray![i].classList.remove(classes.active);
        childrenArray![i].classList.remove(classes.grayscale);
      }
    }
    if (savedQueryObject.mainField !== undefined && childrenArray) {
      for (let i = 0; i < childrenArray!.length; i++) {
        if (childrenArray![i].id !== savedQueryObject.mainField) {
          childrenArray![i].classList.add(classes.grayscale)
        } else {
          childrenArray![i].classList.remove(classes.grayscale)
          childrenArray![i].classList.add(classes.active)
        }
      }
    }
  }, [savedQueryObject, childrenArray]);

  return (
    <div className={classes.filter}>
      <Button styles={classes.filter_button} onClick={showFilterModalHandler}>
        Filters
      </Button>
      <div className={classes.techContainer} id="techContainer">
        {mainFieldArray.map((item) => (
          <div
            key={item}
            id={item}
            className={classes.techContainer_item}
            onClick={techClickHandler}
          >
            <div className={classes.techContainer_item_img}>
              {TechArray[mainFieldArray.indexOf(item)]()}
            </div>
            <p className={classes.techContainer_item_text} >{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterButton;
