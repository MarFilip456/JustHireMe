import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/redux-hooks";
import { uiActions } from "../store/ui-slice";
import Button from "./Button";

import classes from "./Header.module.css";
import { Fragment } from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state)=>state.ui.isDev);
  const logoutHandler = () => {
    dispatch(uiActions.loggingInOut());
    localStorage.removeItem("justHireMeLogin");
    localStorage.removeItem("justHireMeDate");
    if (isDev) {
      localStorage.removeItem("justHireMeDev");
    }
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logo_section}>
          <Link to="/" className={classes.noDecor}>
            <p className={classes.logo}>justhire.me</p>
          </Link>
        </div>
        <div className={classes.main_nav}>
          {isLogged ? (
            <Button onClick={logoutHandler}>Sign out</Button>
          ) : (
            <Button
              onClick={() => dispatch(uiActions.changeVisPopup())}
              styles={classes.CTA_button}
            >
              Sign in
            </Button>
          )}
          <Button
            styles={classes.hamburger_menu}
            onClick={() => dispatch(uiActions.changeVisSide())}
          >
            <span className={classes.hamburger_line} />
          </Button>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
