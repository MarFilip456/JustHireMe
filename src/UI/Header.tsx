import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/redux-hooks';
import { uiActions } from '../store/ui-slice';
import Button from './Button';

import classes from './Header.module.css';
import { Fragment } from 'react';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogged = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state) => state.ui.isDev);
  const logoutHandler = () => {
    navigate('/');
    dispatch(uiActions.loggingInOut());
    localStorage.removeItem('justHireMeDate');
    localStorage.removeItem('justHireMeToken');
    if (isDev) {
      localStorage.removeItem('justHireMeDev');
      dispatch(uiActions.setIsDev());
    }
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logo_section}>
          <Link to="/" className={classes.noDecor}>
            <p className={classes.logo}>justhire.me</p>
          </Link>
        </div>
        <div className={classes.main_nav}>
          {isLogged && !isDev && (
            <Button
              onClick={() => navigate('/empl/addOffer')}
              styles={classes.main_nav__addButtons}
            >
              Add offer
            </Button>
          )}
          {isLogged
            ? (
            <Button
              onClick={logoutHandler}
              styles={classes.main_nav__addButtons}
            >
              Sign out
            </Button>
              )
            : (
            <Button
              onClick={() => dispatch(uiActions.changeVisPopup())}
              styles={classes.CTA_button}
            >
              Sign in
            </Button>
              )}
          <Button
            styles={classes.hamburger_menu}
            onClick={() => dispatch(uiActions.changeVisSide())}
          >
            <span className={classes.hamburger_line} />
          </Button>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
