import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Button from "../../UI/Button";
import classes from "./DevLoginForm.module.css";

const DevLoginForm = (props) => {
  //create a custom hook to make it one function
  //execute with useEffect with setTimeout and cleanup
  const [passHidden, setPassHidden] = useState(true);

  const [emailInput, setEmailInput] = useState("");
  const [touchedEmail, setTouchedEmail] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [touchedPassword, setTouchedPassword] = useState(false);

  const incorrectEmail = !emailInput.includes("@");
  const regex1 = new RegExp("[A-Z]");
  const regex2 = new RegExp("[a-z]");
  const regex3 = new RegExp("[0-9]");
  const incorrectPassword =
    !regex1.test(passwordInput) ||
    !regex2.test(passwordInput) ||
    !regex3.test(passwordInput) ||
    passwordInput.length < 6;

  const validateInputEmail = incorrectEmail && touchedEmail;
  const validateInputPassword = incorrectPassword && touchedPassword;

  const correctEmailHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const correctPasswordhandler = (event) => {
    setPasswordInput(event.target.value);
  };

  const blurEmailHandler = () => {
    setTouchedEmail(true);
  };

  const blurPasswordHandler = () => {
    setTouchedPassword(true);
  };

  let passwordType = passHidden ? "password" : "text";

  const togglePasswordHandler = (event) => {
    event.preventDefault();
    setPassHidden(!passHidden);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (incorrectEmail || incorrectPassword) {
      console.log("dupa");
    } else {
      setEmailInput("");
      setTouchedEmail(false);
      setPasswordInput("");
      setTouchedPassword(false);
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
        {validateInputEmail && <p>Not valid email!</p>}
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
            onChange={correctPasswordhandler}
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
        {validateInputPassword && <p>Not valid password!</p>}
        <Button act={props.act}>{props.act}</Button>
      </form>
    </Fragment>
  );
};

export default DevLoginForm;
