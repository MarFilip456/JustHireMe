import { Link } from "react-router-dom";
import EmplLoginForm from "../components/loginRegister/EmplLoginForm";
import Card from "../UI/Card";
import classes from "./EmplLoginPage.module.css";

const EmplLoginPage = () => {
  return (
    <div className={classes.main_page}>
      <Card styles={classes.main_card}>
        <h1>justhire.me</h1>
        <EmplLoginForm act="Sign in" />
        <p>
          Got no account?
          <Link to="/emplregister" className={classes.main_card__link}>
            <span className={classes.main_card__span}>Register</span>
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default EmplLoginPage;
