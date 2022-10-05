import { Link } from 'react-router-dom';
import LoginForm from '../components/loginRegister/LoginForm';
import DevFastLoginReg from '../components/loginRegister/DevFastLoginReg';
import SlideShow from '../components/loginRegister/SlideShow';

import classes from './LoginPage.module.css';

const LoginPage = () => {
  return (
      <div className={classes.devLogin_main}>
        <div className={classes.devLogin_main_split}>
          <h1 className={classes.devLogin_form}>Get started for free!</h1>
          <DevFastLoginReg act="Sign in" />
          <div className={classes.devLogin_form_line}>
            <span className={classes.devLogin_form_line}>Or</span>
          </div>
          <LoginForm act="Sign in" />
          <p className={classes.devLogin_form}>
            New account?
            <Link to="/devregister" className={classes.devLogin_form}>
              <span className={classes.devLogin_form}>Register</span>
            </Link>
          </p>
          <div className={classes.devLogin_form_line} />
          <span className={classes.devLogin_form} >Forgot password?</span>
        </div>
        <SlideShow />
      </div>
  );
};

export default LoginPage;
