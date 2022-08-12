import React from 'react';
import Button from '../../UI/Button';
import useInput from '../../hooks/use-input';
import emailIcon from '../../images/emailIcon.png';
import keyIcon from '../../images/keyIcon.png';
import useSignUpIn from '../../hooks/use-signupin';
import { useNavigate } from 'react-router-dom';

import classes from './EmplLoginForm.module.css';

const EmplLoginForm: React.FC<{ act: string }> = (props) => {
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

  const loginRegister = useSignUpIn(
    emailInput,
    passwordInput,
    props.act,
    false // isDev property, false for employers
  );
  const navigate = useNavigate();

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      alert('Invalid email or password');
    } else {
      loginRegister();
      resetEmailInput();
      resetPasswordInput();
      navigate(-1);
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
        <Button styles={classes.CTA_button}>{props.act}</Button>
      </form>
    </React.Fragment>
  );
};

export default EmplLoginForm;
