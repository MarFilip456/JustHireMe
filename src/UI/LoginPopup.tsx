import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { uiActions } from '../store/ui-slice';
import Button from './Button';
import Card from './Card';
import classes from './LoginPopup.module.css';

const LoginPopup = () => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Card styles={classes.login_popup}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button
            styles={classes.login_popup_button}
            onClick={() => dispatch(uiActions.changeVisPopup())}
          >
            <svg
              className={classes.login_popup_button__signIn}
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.25 13c0 .69-.56 1.25-1.25 1.25S7.75 13.69 7.75 13s.56-1.25 1.25-1.25 1.25.56 1.25 1.25zM15 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm7 .25c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM10.66 4.12C12.06 6.44 14.6 8 17.5 8c.46 0 .91-.05 1.34-.12C17.44 5.56 14.9 4 12 4c-.46 0-.91.05-1.34.12zM4.42 9.47c1.71-.97 3.03-2.55 3.66-4.44C6.37 6 5.05 7.58 4.42 9.47zM20 12c0-.78-.12-1.53-.33-2.24-.7.15-1.42.24-2.17.24-3.13 0-5.92-1.44-7.76-3.69C8.69 8.87 6.6 10.88 4 11.86c.01.04 0 .09 0 .14 0 4.41 3.59 8 8 8s8-3.59 8-8z"></path>
            </svg>
            <p>Sign in</p>
          </Button>
        </Link>
        <Link to="/devregister" style={{ textDecoration: 'none' }}>
          <Button
            styles={classes.login_popup_button}
            onClick={() => dispatch(uiActions.changeVisPopup())}
          >
            <svg className={classes.login_popup_button__signUp}
            width="20px"
            height="20px"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"></path>
            </svg>
            <p>Register</p>
          </Button>
        </Link>
      </Card>
    </Fragment>
  );
};

export default LoginPopup;
