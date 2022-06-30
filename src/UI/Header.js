import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import Button from "./Button";

import classes from "./Header.module.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.ui.isLoggedIn);

  return (
    <header className={classes.header}>
      <div className={classes.logo_section}>
        <Link to="/" className={classes.noDecor}>
          <p className={classes.logo}>justhire.me</p>
        </Link>
      </div>
      <div className={classes.main_nav}>
        {isLogged ? (
          <Button onClick={() => dispatch(uiActions.loggingInOut())}>Sign out</Button>
        ) : (
          <Button
            onClick={() => dispatch(uiActions.loggingInOut())}
            styles={classes.CTA_button}
          >
            Sign in
          </Button>
        )}
        <Button styles={classes.hamburger_menu} onClick={props.onClick}>
          <span className={classes.hamburger_line} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
