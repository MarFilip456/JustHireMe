import React from 'react';
import Button from '../../UI/Button';
import useInput from '../../hooks/use-input';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/redux-hooks';
import { uiActions } from '../../store/ui-slice';

import classes from './SignUpForm.module.css';
import axios from 'axios';

const SignUpForm: React.FC<{ role: string }> = (props) => {
  const dispatch = useAppDispatch();
  const { role } = props;
  const {
    value: emailInput,
    isTouched: emailIsTouched,
    isValid: emailIsValid,
    valueChangeHandler: correctEmailHandler,
    inputBlurHandler: blurEmailHandler,
    reset: resetEmailInput
  } = useInput('email');

  const {
    value: passwordInput,
    isTouched: passwordIsTouched,
    isValid: passwordIsValid,
    valueChangeHandler: correctPasswordHandler,
    inputBlurHandler: blurPasswordHandler,
    reset: resetPasswordInput
  } = useInput('password');

  const emailHasError = !emailIsValid && emailIsTouched;
  const passwordHasError = !passwordIsValid && passwordIsTouched;

  const navigate = useNavigate();

  const signUpFunction = async () => {
    const url = process.env.REACT_APP_API_ADRESS;
    let requestUrl: string;
    if (role === 'user') {
      requestUrl = url!.concat('/auth/signup/dev');
    } else if (role === 'admin') {
      requestUrl = url!.concat('/auth/signup/emp');
    }
    axios
      .post(requestUrl!, {
        emailInput,
        passwordInput
      })
      .then((response) => {
        navigate('/login');
        return response.data;
      })
      .catch((error) => {
        dispatch(uiActions.changeInformationPopup());
        dispatch(uiActions.setInformationError());
        dispatch(uiActions.showInformation(`User already exist:${error.message}`));
      });
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(uiActions.showInformation('Invalid email or password!'));
    } else {
      signUpFunction();
      resetEmailInput();
      resetPasswordInput();
    }
  };

  return (
    <React.Fragment>
      <form
        className={classes.form}
        onSubmit={formSubmitHandler}
        autoComplete="off"
      >
        <label htmlFor="email" />
        <div className={classes.form_split}>
          <svg
            className={classes.form__image_container}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillOpacity=".3"
              d="M12.72 2.03C6.63 1.6 1.6 6.63 2.03 12.72 2.39 18.01 7.01 22 12.31 22H16c.55 0 1-.45 1-1s-.45-1-1-1h-3.67c-3.73 0-7.15-2.42-8.08-6.03-1.49-5.8 3.91-11.21 9.71-9.71C17.58 5.18 20 8.6 20 12.33v1.1c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.25c0-2.51-1.78-4.77-4.26-5.12-3.4-.49-6.27 2.45-5.66 5.87.34 1.91 1.83 3.49 3.72 3.94 1.84.43 3.59-.16 4.74-1.33.89 1.22 2.67 1.86 4.3 1.21 1.34-.53 2.16-1.9 2.16-3.34v-1.09c0-5.31-3.99-9.93-9.28-10.29zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
            ></path>
          </svg>
          <input
            onChange={correctEmailHandler}
            onBlur={blurEmailHandler}
            value={emailInput}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className={classes.invalid_input}>
          {emailHasError && <p>Invalid email!</p>}
        </div>
        <label htmlFor="password" />
        <div className={classes.form_split}>
          <svg
            className={classes.form__image_container}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillOpacity=".3"
              d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
            ></path>
          </svg>
          <input
            onChange={correctPasswordHandler}
            onBlur={blurPasswordHandler}
            value={passwordInput}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className={classes.invalid_input}>
          {passwordHasError && <p>Invalid password!</p>}
        </div>
        <Button styles={classes.CTA_button}>Register</Button>
      </form>
    </React.Fragment>
  );
};

export default SignUpForm;
