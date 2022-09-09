import React, { Fragment } from 'react';
import Button from '../../UI/Button';
import { useAppDispatch } from '../../store/redux-hooks';
import { uiActions } from '../../store/ui-slice';

import classes from './DevFastLoginReg.module.css';

const DevFastLoginReg: React.FC<{ act: string }> = (props) => {
  const dispatch = useAppDispatch();
  const fastLogin = [
    {
      id: 'Google',
      img: 'https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector.png',
      text: ' with Google'
    },
    {
      id: 'GitHub',
      img: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      text: ' with GitHub'
    },
    {
      id: 'LinkedIn',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png',
      text: ' with LinkedIn'
    },
    {
      id: 'Facebook',
      img: 'https://cdn-icons-png.flaticon.com/512/124/124010.png',
      text: ' with Facebook'
    }
  ];
  const clickHandler = (event: React.MouseEvent) => {
    dispatch(uiActions.changeInformationPopup());
    dispatch(
      uiActions.showInforamtion(
        `Signing in with ${event.currentTarget.id} is not possible yet.`
      )
    );
  };
  return (
    <Fragment>
      {fastLogin.map((opt) => (
        <div
          onClick={clickHandler}
          id={opt.id}
          key={opt.id}
          className={classes.devLogin}
        >
          <Button styles={classes.devLogin_form_login} act={props.act}>
            <img
              className={classes.devLogin_form}
              alt={`${opt.id} logo`}
              src={opt.img}
            />
            <p className={classes.devLogin_form}>
              {props.act} with {opt.id}
            </p>
          </Button>
        </div>
      ))}
    </Fragment>
  );
};

export default DevFastLoginReg;
