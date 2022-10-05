import { Link } from 'react-router-dom';
import SignUpForm from '../components/loginRegister/SignUpForm';
import Card from '../UI/Card';
import classes from './DevNewAccPage.module.css';

const DevNewAccPage = () => {
  return (
    <div className={classes.main_page}>
      <Card styles={classes.main_card}>
        <h1>justhire.me</h1>
        <h5>Register as a developer</h5>
        <SignUpForm role='user' />
        <p>
          Want to be an employer?
          <Link to="/emplregister" className={classes.main_card__link}>
            <span className={classes.main_card__span}>Sign up here</span>
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default DevNewAccPage;
