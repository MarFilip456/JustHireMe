import React, { useState } from 'react';
import Button from '../../UI/Button';
import useInput from '../../hooks/use-input';
import emailIcon from '../../images/emailIcon.png';
import keyIcon from '../../images/keyIcon.png';
import eyeClosedIcon from '../../images/eyeClosedIcon.png';
import eyeOpenIcon from '../../images/eyeOpenIcon.png';
import classes from './DevLoginForm.module.css';
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
          uiActions.showInforamtion(`User does not exist: ${error.message}`)
        );
      });
    localStorage.setItem('justHireMeToken', data.accessToken);
    localStorage.setItem('justHireMeId', data.userId);
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
      dispatch(uiActions.showInforamtion('Incorrect password or email!'));
    } else {
      signInFunction();
      resetEmailInput();
      resetPasswordInput();
      setPassHidden(true);
    }
  };

  return (
    <>
      <form className={classes.devLogin_form} onSubmit={formSubmitHandler}>
        <div className={classes.devLogin_form_labelContainer}>
          <label htmlFor="email">Email</label>
        </div>
        <div className={classes.devLogin_form_inputContainer}>
          <div className={classes.devLogin_form_inputContainer_imgContainer}>
            <img alt="mail_logo" src={emailIcon} />
          </div>
          <input
            onChange={correctEmailHandler}
            onBlur={blurEmailHandler}
            className={classes.devLogin_form_input}
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            value={emailInput}
          />
        </div>
        {emailHasError && <p>Not valid email!</p>}
        <div className={classes.devLogin_form_labelContainer}>
          <label htmlFor="password">Password</label>
        </div>
        <div className={classes.devLogin_form_inputContainer}>
          <div className={classes.devLogin_form_inputContainer_imgContainer}>
            <img src={keyIcon} alt="key_picture" />
          </div>
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
            {passHidden && <img src={eyeClosedIcon} alt="eye_icon" />}
            {!passHidden && <img src={eyeOpenIcon} alt="eye_icon" />}
          </button>
        </div>
        {passwordHasError && <p>Not valid password!</p>}
        <Button act={props.act}>{props.act}</Button>
      </form>
    </>
  );
};

export default LoginForm;
