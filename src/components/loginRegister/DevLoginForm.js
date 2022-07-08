import { Fragment } from "react/cjs/react.production.min";
import Button from "../../UI/Button";
import classes from "./DevLoginForm.module.css";

const DevLoginForm = (props) => {
  return (
    <Fragment>
      <form className={classes.devLogin_form}>
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
            className={classes.devLogin_form_input}
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
          />
        </div>
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
            className={classes.devLogin_form_input}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <button className={classes.devLogin_form_inputContainer_imgContainer}>
            <img
              src="https://toppng.com/uploads/preview/eye-icon-11550224069flugis6lrj.png"
              alt="eye_icon"
            />
          </button>
        </div>
        <Button act={props.act}>{props.act}</Button>
      </form>
    </Fragment>
  );
};

export default DevLoginForm;
