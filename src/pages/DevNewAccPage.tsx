import React from 'react';
import { Link } from 'react-router-dom';
import DevFastLoginReg from '../components/loginRegister/DevFastLoginReg';
import DevLoginForm from '../components/loginRegister/DevLoginForm';
import SlideShow from '../components/loginRegister/SlideShow';

import classes from './DevNewAccPage.module.css';

const DevNewAccPage = () => {
  return (
    <React.Fragment>
      <div className={classes.devLogin_main}>
        <div className={classes.devLogin_main_split}>
          <h1 className={classes.devLogin_form}>Get started for free!</h1>
          <DevFastLoginReg act="Register" />
          <div className={classes.devLogin_form_line}>
            <h3 className={classes.devLogin_form}>Or</h3>
          </div>
          <DevLoginForm act="Register" />
          <p className={classes.devLogin_form}>
            Already have an account?
            <Link to="/devlogin" className={classes.devLogin_form}>
              <span className={classes.devLogin_form}>Sign in</span>
            </Link>
          </p>
        </div>
        <SlideShow />
      </div>
    </React.Fragment>
  );
};

export default DevNewAccPage;
