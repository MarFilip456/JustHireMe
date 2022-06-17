import classes from "./JobCard.module.css";

const JobCard = (props) => {
  return (
    <div className={classes.test} onClick={props.onClick} >
     <p>{ props.JobPosition }</p>
     <p>check</p>
    </div>
  );
};

export default JobCard;
