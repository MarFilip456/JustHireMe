import { Fragment } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/use-request";
import { useAppSelector, useAppDispatch } from "../store/redux-hooks";
import { uiActions } from "../store/ui-slice";

import JobDescription from "../components/job/JobDescription";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../components/modal/Modal";
import DeletePopup from "../UI/DeletePopup";

import classes from "./JobPage.module.css";

const JobPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ jobId: string }>();
  const urlContinue = "/" + params.jobId + ".json";
  const { error, loading } = useFetch(
    process.env.REACT_APP_API_DATABASE_URL + urlContinue,
    "one"
  );
  const offers = useAppSelector((state) => state.offers.offers);
  const deletePopupVisible = useAppSelector((state) => state.ui.deletePopup);

  const removeDeleteModalHandler = () => {
    dispatch(uiActions.changeDeletePopup());
  };

  const succesfulFetch = offers?.length !== 0;

  return (
    <Fragment>
      {deletePopupVisible && (
        <Modal onClick={removeDeleteModalHandler}>
          <DeletePopup />
        </Modal>
      )}
      <div className={classes.test}>
        {loading && <LoadingSpinner />}
        {error && <p>!Error message!</p>}
        {succesfulFetch && <JobDescription job={offers[0]} />}
      </div>
    </Fragment>
  );
};

export default JobPage;
