import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { uiActions } from "../store/ui-slice";
import Button from "./Button";
import Card from "./Card";

import faceIcon from "../images/faceIcon.png";
import briefcaseIcon from "../images/briefcaseIcon.png";
import classes from "./LoginPopup.module.css";

const LoginPopup = () => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Card styles={classes.login_popup}>
        <Link to="/devlogin" style={{textDecoration: "none"}} >
          <Button  styles={classes.login_popup_button} onClick={() => dispatch(uiActions.changeVisPopup())}>
            <img alt="face_icon" src={faceIcon} />
            <p>Sign in as a developer</p>
          </Button>
        </Link>
        <Link to="/devlogin" style={{textDecoration: "none"}} >
          <Button styles={classes.login_popup_button} onClick={() => dispatch(uiActions.changeVisPopup())}>
            <img alt="briefcase_icon" src={briefcaseIcon} />
            <p>Sign in to Employer Panel</p>
          </Button>
        </Link>
      </Card>
    </Fragment>
  );
};

export default LoginPopup;
