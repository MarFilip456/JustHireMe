import React, { useState } from 'react';
import Button from '../../UI/Button';
import useInput from '../../hooks/use-input';
import classes from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch } from '../../store/redux-hooks';
import { uiActions } from '../../store/ui-slice';

const LoginForm: React.FC<{
  act: string;
}> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  const signInFunction = async () => {
    const url = process.env.REACT_APP_API_ADRESS;
    const requestUrl = url!.concat('/auth/signin');
    const data = await axios
      .post(requestUrl!, {
        emailInput,
        passwordInput
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        dispatch(uiActions.changeInformationPopup());
        dispatch(uiActions.setInformationError());
        dispatch(
          uiActions.showInformation(`User does not exist: ${error.message}`)
        );
      });
    localStorage.setItem('justHireMeToken', data.accessToken);
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    localStorage.setItem('justHireMeDate', expirationDate.toISOString());
    dispatch(uiActions.loggingInOut());
    if (data.userRole === 'user') {
      dispatch(uiActions.setIsDev());
      localStorage.setItem('justHireMeDev', 'dev');
    }
    navigate(-1);
  };

  const [passHidden, setPassHidden] = useState(true);

  const emailHasError = !emailIsValid && emailIsTouched;
  const passwordHasError = !passwordIsValid && passwordIsTouched;

  const passwordType = passHidden ? 'password' : 'text';

  const togglePasswordHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setPassHidden((prevState) => !prevState);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(uiActions.showInformation('Incorrect password or email!'));
    } else {
      signInFunction();
      resetEmailInput();
      resetPasswordInput();
      setPassHidden(true);
    }
  };

  return (
    <form
      className={classes.devLogin_form}
      onSubmit={formSubmitHandler}
      autoComplete="off"
    >
      <div className={classes.devLogin_form_labelContainer}>
        <label htmlFor="email">Email</label>
      </div>
      <div className={classes.devLogin_form_inputContainer}>
        <svg
          className={classes.devLogin_form_inputContainer_imgContainer}
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
          className={classes.devLogin_form_input}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={emailInput}
        />
      </div>
      <div className={classes.invalid_input}>
      {emailHasError && <p>Not valid password!</p>}
      </div>
      <div className={classes.devLogin_form_labelContainer}>
        <label htmlFor="password">Password</label>
      </div>
      <div className={classes.devLogin_form_inputContainer}>
        <svg
          className={classes.devLogin_form_inputContainer_imgContainer}
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
          onBlur={blurPasswordHandler}
          onChange={correctPasswordHandler}
          className={classes.devLogin_form_input}
          type={passwordType}
          id="password"
          name="password"
          placeholder="Password"
          value={passwordInput}
        />
        <button
          className={classes.devLogin_form_inputContainer_imgContainer}
          onClick={togglePasswordHandler}
        >
          {passHidden && (
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillOpacity=".3"
                d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24zM2.71 3.16c-.39.39-.39 1.02 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33c-.15-1.4-1.25-2.49-2.64-2.64l2.64 2.64z"
              ></path>
            </svg>
          )}
          {!passHidden && (
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillOpacity=".3"
                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
              ></path>
            </svg>
          )}
        </button>
      </div>
      <div className={classes.invalid_input}>
      {passwordHasError && <p>Not valid password!</p>}
      </div>
      <Button styles={classes.CTA_button} act={props.act}>
        {props.act}
      </Button>
    </form>
  );
};

export default LoginForm;
