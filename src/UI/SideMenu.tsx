import Button from './Button';
import classes from './SideMenu.module.css';
import { useAppSelector, useAppDispatch } from '../store/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { uiActions } from '../store/ui-slice';
import React, { Fragment } from 'react';

const SideMenu: React.FC<{ styles: React.CSSProperties }> = (props) => {
  const isLogged = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state) => state.ui.isDev);
  const isSideVisible = useAppSelector((state) => state.ui.visibleSide);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navigateHandler = (event: React.MouseEvent) => {
    const id = event.currentTarget.id;
    if (id === 'offers') {
      navigate('/');
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
    dispatch(uiActions.loggingInOut());
    localStorage.removeItem('justHireMeLogin');
    localStorage.removeItem('justHireMeDate');
    localStorage.removeItem('justHireMeToken');
    localStorage.removeItem('justHireMeId');
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
        <Button id="offers" onClick={navigateHandler}>
          Offers
        </Button>
        {!isLogged && (
          <Fragment>
            <Button id="signIn" onClick={navigateHandler}>
              Sign in
            </Button>
            <Button id="signUp" onClick={navigateHandler}>
              Sign up
            </Button>
          </Fragment>
        )}
        {isLogged &&
         (
          <Fragment>
            <Button id="userProfile" onClick={navigateHandler}>
              {isDev ? 'User Profile' : 'Employer panel'}
            </Button>
            {!isDev && (
              <Button onClick={navigateToFormHandler}>Add Offer</Button>
            )}
            <Button onClick={logoutHandler} >Sign out</Button>
          </Fragment>
         )}
      </div>
    </div>
  );
};

export default SideMenu;
