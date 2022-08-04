import React, { useState } from "react";
import { Fragment } from "react";
import Button from "../../UI/Button";
import useInput from "../../hooks/use-input";
import useSignUpIn from "../../hooks/use-signupin";
import emailIcon from "../../images/emailIcon.png";
import keyIcon from "../../images/keyIcon.png";
import eyeClosedIcon from "../../images/eyeClosedIcon.png";
import eyeOpenIcon from "../../images/eyeOpenIcon.png";
import classes from "./DevLoginForm.module.css";
import { useNavigate } from "react-router-dom";

const DevLoginForm: React.FC<{
  act: string;
}> = (props) => {
  const {
    value: emailInput,
    isTouched: emailIsTouched,
    isValid: emailIsValid,
    valueChangeHandler: correctEmailHandler,
    inputBlurHandler: blurEmailHandler,
    reset: resetEmailInput,
  } = useInput("email");

  const {
    value: passwordInput,
    isTouched: passwordIsTouched,
    isValid: passwordIsValid,
    valueChangeHandler: correctPasswordHandler,
    inputBlurHandler: blurPasswordHandler,
    reset: resetPasswordInput,
  } = useInput("password");

  const loginRegister = useSignUpIn(
    emailInput,
    passwordInput,
    props.act,
    true //isDev property, true for devs
  );

  const [passHidden, setPassHidden] = useState(true);

  const navigate = useNavigate();

  const emailHasError = !emailIsValid && emailIsTouched;
  const passwordHasError = !passwordIsValid && passwordIsTouched;

  let passwordType = passHidden ? "password" : "text";

  const togglePasswordHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setPassHidden((prevState) => !prevState);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      alert("Invalid email or password");
    } else {
      loginRegister();
      resetEmailInput();
      resetPasswordInput();
      setPassHidden(true);
      if (props.act==="Register") {
        navigate(-2);
      } else if (props.act==="Sign in")
      navigate(-1);
    }
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default DevLoginForm;
