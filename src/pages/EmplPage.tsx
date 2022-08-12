import React from 'react';
import JobsList from '../components/job/JobsList';

const EmplPage = () => {
  return (
    <React.Fragment>
      <h1>Your list of uploaded offers.</h1>
      <JobsList />
    </React.Fragment>
  );
};
export default EmplPage;
