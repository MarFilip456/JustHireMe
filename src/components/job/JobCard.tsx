import React from "react";
import classes from "./JobCard.module.css";

const JobCard: React.FC<{
  onClick?: (event: React.MouseEvent) => void;
  id: string;
}> = (props) => {
  return (
    <div className={classes.test} onClick={props.onClick}>
      <p>{props.id}</p>
      <p>check</p>
    </div>
  );
};

export default JobCard;
