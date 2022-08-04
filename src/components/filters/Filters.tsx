import Button from "../../UI/Button";

import classes from "./Filters.module.css";

const Filters = () => {
  return (
    <div className={classes.filter_list}>
      <Button>Lupa</Button>
      <Button>Location</Button>
      <Button>Tech</Button>
      <Button>More filters</Button>
      <Button>Latest</Button>
    </div>
  );
};

export default Filters;
