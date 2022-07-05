import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import Button from "../UI/Button";

const DevNewAcc = () => {
  return (
    <Fragment>
      <h1>Get started for free!</h1>
      <Button>
        <img
          alt="Google logo"
          src="https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector.png"
        />
        <p>Register with Google</p>
      </Button>
      <h3>Or</h3>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="E-mail" />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <Button>Register</Button>
      </form>
      <p>
        Already have an account?
        <Link to="/devlogin">
          <span>Sign in</span>
        </Link>
      </p>
    </Fragment>
  );
};

export default DevNewAcc;
