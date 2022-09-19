import React, { useState } from 'react';
import DevShort from './DevShort';
import DevExtended from './DevExtended';
import Card from '../../../UI/Card';

import classes from './ApplierItem.module.css';
import Button from '../../../UI/Button';

const ApplierItem: React.FC<{
  onClick?: (event: React.MouseEvent) => void;
  name: string;
  surname: string;
  logo: string;
  email: string;
  experience: string;
  mainLang: string;
  location: string;
  aboutYou: string;
  gitHub: string;
  linkedIn: string;
  id: string;
}> = (props) => {
  const [expandDescription, setExpandDescription] = useState(false);

  const expandHandler = () => {
    setExpandDescription((prevState) => !prevState);
  };

  const expandCss = expandDescription
    ? classes.expand_container
    : classes.job_short__container;

  const buttonClasses = !expandDescription
    ? classes.main_button
    : classes.main_button__active;

  return (
    <div className={classes.main} >
      <Card styles={expandCss}>
        <DevShort
          name={props.name}
          surname={props.surname}
          logo={props.logo}
          experience={props.experience}
          mainLang={props.mainLang}
          location={props.location}
          id={props.id}
        />
        <DevExtended
          expandDescription={expandDescription}
          email={props.email}
          aboutYou={props.aboutYou}
          gitHub={props.gitHub}
          linkedIn={props.linkedIn}
          id={props.id}
        />
      </Card>
      <Button styles={buttonClasses} onClick={expandHandler} >Toogle</Button>
    </div>
  );
};

export default ApplierItem;
