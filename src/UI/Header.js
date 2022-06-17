import { Link } from "react-router-dom";
import ReusableButton from "./ReusableButton";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo_section}>
        <Link to="/mainpage" className={classes.noDecor}>
          <p className={classes.logo}>justhire.me</p>
        </Link>
      </div>
      <div className={classes.main_nav}>
        <ReusableButton className={classes.button} styles={classes.CTA_button}>
          Sign in
        </ReusableButton>
        <ReusableButton className={classes.button}>Signout</ReusableButton>
        <ReusableButton styles={classes.hamburger_menu} onClick={props.onClick} >
          <span className={classes.hamburger_line} />
        </ReusableButton>
      </div>
    </header>
  );
};

export default Header;
