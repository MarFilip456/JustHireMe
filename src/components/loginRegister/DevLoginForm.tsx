import React, { useState } from "react";
import { Fragment } from "react";
import Button from "../../UI/Button";
import useInput from "../../hooks/use-input";
import useSignUpIn from "../../hooks/use-signupin";
import classes from "./DevLoginForm.module.css";

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
  const loginRegister = useSignUpIn(emailInput, passwordInput, props.act)

  const [passHidden, setPassHidden] = useState(true);

  const emailHasError = !emailIsValid && emailIsTouched;
  const passwordHasError = !passwordIsValid && passwordIsTouched;

  let passwordType = passHidden ? "password" : "text";

  const togglePasswordHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setPassHidden((prevState)=>!prevState);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailIsValid  || !passwordIsValid) {
      alert("Invalid email or password");
    } else {
      loginRegister();
      resetEmailInput();
      resetPasswordInput();
      setPassHidden(true);
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
            <img
              alt="mail_logo"
              src="http://cdn.onlinewebfonts.com/svg/img_146787.png"
            />
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
            <img
              src="https://toppng.com/uploads/preview/library-stock-house-key-free-icon-designed-by-freepik-key-vector-11562922532djl58jicyw.png"
              alt="key_picture"
            />
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
            {passHidden && (
              <img
                src="https://toppng.com/uploads/preview/eye-closed-icon-11550225620ajweggaqlk.png"
                alt="eye_icon"
              />
            )}
            {!passHidden && (
              <img
                src="https://toppng.com/uploads/preview/eye-icon-11550224069flugis6lrj.png"
                alt="eye_icon"
              />
            )}
          </button>
        </div>
        {passwordHasError && <p>Not valid password!</p>}
        <Button act={props.act}>{props.act}</Button>
      </form>
    </Fragment>
  );
};

export default DevLoginForm;
