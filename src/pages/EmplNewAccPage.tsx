import { Link } from 'react-router-dom';
import SignUpForm from '../components/loginRegister/SignUpForm';
import Card from '../UI/Card';
import classes from './EmplNewAccPage.module.css';

const EmplNewAccPage = () => {
  return (
    <div className={classes.main_page}>
      <Card styles={classes.main_card}>
        <h1>justhire.me</h1>
        <h2>Register as an employer</h2>
        <SignUpForm role='admin' />
        <p>
          Want to be a developer?
          <Link to="/devregister" className={classes.main_card__link}>
            <span className={classes.main_card__span}>Sign up here</span>
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default EmplNewAccPage;
