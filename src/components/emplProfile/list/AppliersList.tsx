import React, { Fragment } from 'react';
import ApplierItem from './ApplierItem';

import classes from './AppliersList.module.css';
import { offerObject } from '../../../store/offers-slice';

const AppliersList: React.FC<{ job: offerObject }> = (props) => {
  const { appliers } = props.job;

  return (
    <Fragment>
      <h3 className={classes.header}>List of devs that applied</h3>
      <ul className={classes.list}>
        {appliers &&
          appliers!.map((dev) => (
            <li key={dev.id} className={classes.list_item}>
              <ApplierItem
                id={dev.id}
                name={dev.name!}
                surname={dev.surname!}
                mainLang={dev.mainLang!}
                experience={dev.experience!}
                location={dev.location!}
                gitHub={dev.gitHubUrl!}
                logo={dev.logoUrl!}
                email={dev.email}
                aboutYou={dev.aboutYou!}
                linkedIn={dev.linkedInUrl!}
              />
            </li>
          ))}
      </ul>
      {appliers!.length === 0 && (
        <p className={classes.information}>No one applied yet.</p>
      )}
    </Fragment>
  );
};
export default AppliersList;
