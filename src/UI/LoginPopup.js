import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import { uiActions } from "../store/ui-slice";
import Button from "./Button";
import Card from "./Card";

import classes from "./LoginPopup.module.css";

const LoginPopup = () => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Card styles={classes.loginPopup}>
        <Link to="/devlogin">
          <Button onClick={() => dispatch(uiActions.changeVisPopup())}>
            <p>Sign in as a developer</p>
          </Button>
        </Link>
        <Link to="/devlogin">
          <Button onClick={() => dispatch(uiActions.changeVisPopup())}>
            <p>Sign in to Employer Panel</p>
          </Button>
        </Link>
      </Card>
    </Fragment>
  );
};

export default LoginPopup;
