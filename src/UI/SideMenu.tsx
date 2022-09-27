import Button from './Button';
import classes from './SideMenu.module.css';
import { useAppSelector, useAppDispatch } from '../store/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { uiActions } from '../store/ui-slice';
import React from 'react';
import Card from './Card';
import faceIcon from '../images/faceIcon.png';
import briefcaseIcon from '../images/briefcaseIcon.png';
import listIcon from '../images/listIcon.png';
import addOfferIcon from '../images/addOfferIcon.png';
import logoutIcon from '../images/logoutIcon.png';

const SideMenu: React.FC<{ styles: React.CSSProperties }> = (props) => {
  const isLogged = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state) => state.ui.isDev);
  const isSideVisible = useAppSelector((state) => state.ui.visibleSide);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navigateHandler = (event: React.MouseEvent) => {
    const id = event.currentTarget.id;
    if (id === 'offers') {
      navigate('/offer');
    }
    if (id === 'signIn') {
      navigate('/login');
    }
    if (id === 'signUp') {
      navigate('/devregister');
    }
    if (id === 'userProfile') {
      if (isDev) {
        navigate('/dev/profile');
      } else {
        navigate('/empl/profile');
      }
    }
    dispatch(uiActions.changeVisSide());
  };

  const navigateToFormHandler = () => {
    navigate('/empl/addOffer');
    dispatch(uiActions.changeVisSide());
  };

  const logoutHandler = () => {
    navigate('/');
    dispatch(uiActions.loggingInOut());
    localStorage.removeItem('justHireMeDate');
    localStorage.removeItem('justHireMeToken');
    if (isDev) {
      localStorage.removeItem('justHireMeDev');
      dispatch(uiActions.setIsDev());
    }
    if (isSideVisible) {
      dispatch(uiActions.changeVisSide());
    }
  };

  return (
    <div className={`${classes.sideMenu} && ${props.styles}`}>
      <h1>MENU</h1>
      <div className={classes.button_container}>
        <Card styles={classes.button_container__card}>
          <Button
            id="offers"
            onClick={navigateHandler}
            styles={classes.button_container__cardItem}
          >
            <div className={classes.cardItem_imgContainer} >
                <img alt='list_icon' src={listIcon}/>
              </div>
            Offers
          </Button>
        </Card>
        {!isLogged && (
          <Card styles={classes.button_container__card}>
            <Button
              id="signIn"
              onClick={navigateHandler}
              styles={classes.button_container__cardItem}
            >
              <div className={classes.cardItem_imgContainer} >
                <img alt='face_icon' src={faceIcon}/>
              </div>
              Sign in
            </Button>
            <Button
              id="signUp"
              onClick={navigateHandler}
              styles={classes.button_container__cardItem}
            >
              <div className={classes.cardItem_imgContainer} >
                <img alt="briefcase_icon" src={briefcaseIcon}/>
              </div>
              Sign up
            </Button>
          </Card>
        )}
        {isLogged && (
          <Card styles={classes.button_container__card}>
            <Button
              id="userProfile"
              onClick={navigateHandler}
              styles={classes.button_container__cardItem}
            >
              <div className={classes.cardItem_imgContainer} >
                <img alt='face_icon' src={faceIcon}/>
              </div>
              {isDev ? 'User Profile' : 'Employer panel'}
            </Button>
            {!isDev && (
              <Button
                onClick={navigateToFormHandler}
                styles={classes.button_container__cardItem}
              >
                <div className={classes.cardItem_imgContainer} >
                <img alt='addOfer_icon' src={addOfferIcon}/>
              </div>
                Add Offer
              </Button>
            )}
            <Button
              onClick={logoutHandler}
              styles={classes.button_container__cardItem}
            >
              <div className={classes.cardItem_imgContainer} >
                <img alt='logout_icon' src={logoutIcon}/>
              </div>
              Sign out
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
