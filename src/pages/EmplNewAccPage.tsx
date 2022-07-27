import { Link } from "react-router-dom";
import EmplLoginForm from "../components/loginRegister/EmplLoginForm";
import Card from "../UI/Card";
import classes from "./EmplNewAccPage.module.css";

const EmplNewAccPage = () => {
  return (
    <div className={classes.main_page} >
      <Card styles={classes.main_card} >
        <h1>justhire.me</h1>
        <EmplLoginForm act="Register" />
        <p>
          Already registered?
          <Link to="/empllogin" className={classes.main_card__link} >
            <span className={classes.main_card__span} >Sign in</span>
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default EmplNewAccPage;
