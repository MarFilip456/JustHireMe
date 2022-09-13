import Button from '../../UI/Button';

import classes from './Filters.module.css';
import SearchFilter from './SearchFilter';
import TechFilter from './TechFilter';

const Filters = () => {
  return (
    <div className={classes.filter_list}>
      <SearchFilter searchFor='jobPosition' />
      <SearchFilter searchFor='location' />
      <TechFilter />
      <Button>More filters</Button>
      <Button>Latest</Button>
      <Button>With salary</Button>
      <Button>All offers</Button>
    </div>
  );
};

export default Filters;
