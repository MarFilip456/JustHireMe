import React from "react";
import { useAppSelector } from "../../store/redux-hooks";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/use-request";
import JobDescription from "./JobDescription";
import Button from "../../UI/Button";
import classes from "./JobCard.module.css";

const JobCard: React.FC<{
  onClick?: (event: React.MouseEvent) => void;
  id: string;
}> = (props) => {
  const params = useParams<{ jobId: string }>();
  const urlContinue = "/" + params.jobId + ".json";
  const { error, loading } = useFetch(
    process.env.REACT_APP_API_DATABASE_URL + urlContinue, "one"
  );
  const offers = useAppSelector((state) => state.offers.offers);
  
  const succesfulFetch = offers?.length !== 0;

  return (
    <div className={classes.test} onClick={props.onClick}>
      {loading && <p>Loading...</p>}
      {error && <p>!Error message!</p>}
      {succesfulFetch && <JobDescription job={offers[0]} />}
      <Button>Apply</Button>
    </div>
  );
};

export default JobCard;
