import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import Button from "../UI/Button";

import classes from "./DevNewAccPage.module.css";

const DevNewAccPage = () => {
  return (
    <Fragment>
      <div className={classes.devLogin_main}>
        <div className={classes.devLogin_main_split}>
          <h1 className={classes.devLogin_form}>Get started for free!</h1>
          <Button styles={classes.devLogin_form_login}>
            <img
              className={classes.devLogin_form}
              alt="Google logo"
              src="https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector.png"
            />
            <p className={classes.devLogin_form}>Register with Google</p>
          </Button>
          <Button styles={classes.devLogin_form_login}>
            <img
              className={classes.devLogin_form}
              alt="GitHub logo"
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            />
            <p className={classes.devLogin_form}>Register with GitHub</p>
          </Button>
          <Button styles={classes.devLogin_form_login}>
            <img
              className={classes.devLogin_form}
              alt="LinkedIn logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
            />
            <p className={classes.devLogin_form}>Register with LinkedIn</p>
          </Button>
          <Button styles={classes.devLogin_form_login}>
            <img
              className={classes.devLogin_form}
              alt="Facebook logo"
              src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
            />
            <p className={classes.devLogin_form}>Register with Facebook</p>
          </Button>
          <div className={classes.devLogin_form_line}>
            <h3 className={classes.devLogin_form}>Or</h3>
          </div>
          <form className={classes.devLogin_form}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="E-mail" />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <Button className={classes.devLogin_form}>Register</Button>
          </form>
          <p className={classes.devLogin_form}>
            Already have an account?
            <Link to="/devlogin" className={classes.devLogin_form}>
              <span className={classes.devLogin_form}>Sign in</span>
            </Link>
          </p>
        </div>
        <div className={classes.devLogin_main_split}>
          <div>
            <button />
            <img alt="figure something smart" />
            <button />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DevNewAccPage;
