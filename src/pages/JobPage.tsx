import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/redux-hooks';
import { uiActions } from '../store/ui-slice';

import JobDescription from '../components/job/JobDescription';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../components/modal/Modal';
import DeletePopup from '../UI/DeletePopup';

import classes from './JobPage.module.css';
import useSingleOffer from '../hooks/use-singleOffer';

const JobPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ jobId: string }>();
  const { data, loading, error } = useSingleOffer(params.jobId!);
  const deletePopupVisible = useAppSelector((state) => state.ui.deletePopup);

  const removeDeleteModalHandler = () => {
    dispatch(uiActions.changeDeletePopup());
  };

  const succesfulFetch = data !== null;
  useEffect(() => {
    if (error) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.showInforamtion('Could not fetch offer data!'));
    }
  }, [error]);
  return (
    <React.Fragment>
      {deletePopupVisible && (
        <Modal onClick={removeDeleteModalHandler}>
          <DeletePopup />
        </Modal>
      )}
      <div className={classes.test}>
        {loading && <LoadingSpinner />}
        {succesfulFetch && <JobDescription job={data!} />}
      </div>
    </React.Fragment>
  );
};

export default JobPage;
