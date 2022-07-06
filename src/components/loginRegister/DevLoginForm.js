import { Fragment } from "react/cjs/react.production.min";
import Button from "../../UI/Button";
import classes from "./DevLoginForm.module.css";

const DevLoginForm = (props) => {
  return (
    <Fragment>
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
        <Button className={classes.devLogin_form} act={props.act}>{props.act}</Button>
      </form>
    </Fragment>
  );
};

export default DevLoginForm;
