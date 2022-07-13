import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/redux-hooks";
import { useParams } from "react-router-dom";
import useFetch from "./use-request";
import JobDescription from "./JobDescription";
import Button from "../../UI/Button";
import type { offerObject } from "../../store/offers-slice";
import classes from "./JobCard.module.css";


const JobCard: React.FC<{
  onClick?: (event: React.MouseEvent) => void;
  id: string;
}> = (props) => {
  //fetch only one offer selected by id
  const { error, loading } = useFetch(process.env.REACT_APP_API_DATABASE_URL);
  const offers = useAppSelector((state) => state.offers.offers);
  const params = useParams<{ jobId: string }>();
  const [exactOffer, setExactOffer] = useState<offerObject[]>([]);
  const succesfulFetch = exactOffer?.length !== 0;

  useEffect(() => {
    const filteredOffer = offers.filter(
      (offers) => offers.id! === params.jobId
    );
    setExactOffer(filteredOffer);
  }, [offers, params.jobId]);

  return (
    <div className={classes.test} onClick={props.onClick}>
      {loading && <p>Loading...</p>}
      {error && <p>!Error message!</p>}
      {succesfulFetch && <JobDescription job={exactOffer[0]} />}
      <Button>Apply</Button>
    </div>
  );
};

export default JobCard;
