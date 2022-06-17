import ReusableButton from "../UI/ReusableButton";

import classes from "./Filters.module.css";

const Filters = () => {
  return (
    <div className={classes.filter_list}>
      <ReusableButton>Lupa</ReusableButton>
      <ReusableButton>Location</ReusableButton>
      <ReusableButton>Tech</ReusableButton>
      <ReusableButton>More filters</ReusableButton>
      <ReusableButton>Latest</ReusableButton>
    </div>
  );
};

export default Filters;
