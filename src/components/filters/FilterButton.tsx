import Button from '../../UI/Button';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { uiActions } from '../../store/ui-slice';
import { offersActions } from '../../store/offers-slice';
import { mainFieldArray } from '../emplProfile/form/OfferForm2';
import admin from '../../imagesTech/admin.png';
import analytics from '../../imagesTech/analytics.png';
import architecture from '../../imagesTech/architecture.png';
import C from '../../imagesTech/C.png';
import data from '../../imagesTech/data.png';
import devops from '../../imagesTech/devops.png';
import dotNet from '../../imagesTech/dotNet.png';
import erp from '../../imagesTech/erp.png';
import game from '../../imagesTech/game.png';
import go from '../../imagesTech/go.png';
import html from '../../imagesTech/html.png';
import java from '../../imagesTech/java.png';
import js from '../../imagesTech/js.png';
import mobile from '../../imagesTech/mobile.png';
import other from '../../imagesTech/other.png';
import php from '../../imagesTech/php.png';
import pm from '../../imagesTech/pm.png';
import python from '../../imagesTech/python.png';
import ruby from '../../imagesTech/ruby.png';
import scala from '../../imagesTech/scala.png';
import security from '../../imagesTech/security.png';
import support from '../../imagesTech/support.png';
import testing from '../../imagesTech/testing.png';
import uxui from '../../imagesTech/uxui.png';

import classes from './FilterButton.module.css';
import React, { useEffect } from 'react';

const FilterButton = () => {
  const dispatch = useAppDispatch();
  const showFilterModalHandler = () => {
    dispatch(uiActions.changeVisFilter());
  };

  const techIconArray = [
    js,
    html,
    php,
    ruby,
    python,
    java,
    dotNet,
    scala,
    C,
    mobile,
    testing,
    devops,
    admin,
    uxui,
    pm,
    game,
    analytics,
    security,
    data,
    go,
    support,
    erp,
    architecture,
    other
  ];
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
    if (savedQueryObject.mainField !== undefined) {
      for (let i = 0; i < childrenArray!.length; i++) {
        if (childrenArray![i].id !== savedQueryObject.mainField) {
          childrenArray![i].classList.add(classes.grayscale)
        } else {
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
              <img
                alt={item}
                src={techIconArray[mainFieldArray.indexOf(item)]}
              />
            </div>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterButton;
