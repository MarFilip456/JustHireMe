import React, { useState, useEffect } from 'react';
import classes from './DevExtended.module.css';

const DevExtended: React.FC<{
  onClick?: (event: React.MouseEvent) => void;
  email: string;
  aboutYou: string;
  gitHub: string;
  linkedIn: string;
  id: string;
  expandDescription: boolean;
}> = (props) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let timer: NodeJS.Timer;
    if (props.expandDescription) {
      timer = setTimeout(() => {
        setIsShown(true);
      }, 200);
    }
    if (!props.expandDescription) {
      setIsShown(false);
    }

    return () => clearTimeout(timer);
  }, [props.expandDescription]);

  const addContClasses = isShown
    ? classes.add_content__visible
    : classes.add_content__nonVisible;

  return (
    <div className={addContClasses}>
      <div className={classes.add_content__overflow} >
        <h3>Email address</h3>
        <p>{props.email}</p>
        <h3>About me</h3>
        {props.aboutYou && <p>{props.aboutYou}</p>}
        {!props.aboutYou && <p>User did not fill this area.</p>}
        <h3>GitHub Account</h3>
        {props.gitHub && <p>{props.gitHub}</p>}
        {!props.gitHub && <p>Not provided by applyer</p>}
        <h3>LinkedIn page</h3>
        {props.linkedIn && <p>{props.linkedIn}</p>}
        {!props.linkedIn && <p>Not provided by applyer</p>}
      </div>
    </div>
  );
};

export default DevExtended;
