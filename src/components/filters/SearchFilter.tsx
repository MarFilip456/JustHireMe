import React from 'react';
import searchIcon from '../../images/searchIcon.png';

import classes from './SearchFilter.module.css';

const SearchFilter: React.FC<{
  searchFor: string;
  refObject: React.RefObject<HTMLInputElement>;
  defaultProp: string | undefined;
}> = (props) => {
  const { searchFor, refObject, defaultProp } = props;
  let searchString: string;
  if (searchFor === 'jobPosition') {
    searchString = 'position';
  }
  if (searchFor === 'location') {
    searchString = 'location';
  }
  return (
    <div className={classes.main}>
      <div className={classes.container_img}>
        <img src={searchIcon} alt="search_icon" />
      </div>
      <input
        type="search"
        placeholder={`Search by ${searchString!}...`}
        ref={refObject}
        defaultValue={defaultProp}
      />
    </div>
  );
};

export default SearchFilter;
