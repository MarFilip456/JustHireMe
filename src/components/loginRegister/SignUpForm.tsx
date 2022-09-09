import React from 'react';
import Button from '../../UI/Button';
import useInput from '../../hooks/use-input';
import emailIcon from '../../images/emailIcon.png';
import keyIcon from '../../images/keyIcon.png';
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
      }).catch((error) => {
        dispatch(uiActions.changeInformationPopup());
        dispatch(uiActions.showInforamtion(`${error.message}`));
      });
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.showInforamtion('Invalid email or password!'));
    } else {
      signUpFunction();
      resetEmailInput();
      resetPasswordInput();
    }
  };

  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <label htmlFor="email" />
        <div className={classes.form_split}>
          <div className={classes.form__image_container}>
            <img alt="emailIcon" src={emailIcon} />
          </div>
          <input
            onChange={correctEmailHandler}
            onBlur={blurEmailHandler}
            value={emailInput}
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
          />
          {emailHasError && <p>Invalid email!</p>}
        </div>
        <label htmlFor="password" />
        <div className={classes.form_split}>
          <div className={classes.form__image_container}>
            <img alt="keyIcon" src={keyIcon} />
          </div>
          <input
            onChange={correctPasswordHandler}
            onBlur={blurPasswordHandler}
            value={passwordInput}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          {passwordHasError && <p>Invalid password!</p>}
        </div>
        <Button styles={classes.CTA_button}>Register</Button>
      </form>
    </React.Fragment>
  );
};

export default SignUpForm;
