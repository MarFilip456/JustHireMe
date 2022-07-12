import { Link } from "react-router-dom";
import { Fragment } from "react";
import DevLoginForm from "../components/loginRegister/DevLoginForm";
import DevFastLoginReg from "../components/loginRegister/DevFastLoginReg";
import SlideShow from "../components/loginRegister/SlideShow";

import classes from "./DevLoginPage.module.css";

const DevLoginPage = () => {
  return (
    <Fragment>
      <div className={classes.devLogin_main}>
        <div className={classes.devLogin_main_split}>
          <h1 className={classes.devLogin_form}>Get started for free!</h1>
          <DevFastLoginReg act="Sign in" />
          <div className={classes.devLogin_form_line}>
            <h3 className={classes.devLogin_form}>Or</h3>
          </div>
          <DevLoginForm act="Sign in" />
          <p className={classes.devLogin_form}>
            Got no account?
            <Link to="/devregister" className={classes.devLogin_form}>
              <span className={classes.devLogin_form}>Register</span>
            </Link>
          </p>
        </div>
        <SlideShow />
      </div>
    </Fragment>
  );
};

export default DevLoginPage;
