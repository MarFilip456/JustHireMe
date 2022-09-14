import React, { useState } from 'react';
import { useAppDispatch } from '../../store/redux-hooks';
import { offersActions } from '../../store/offers-slice';
import Button from '../../UI/Button';
import { Slider, styled } from '@mui/material';
import MuiInput from '@mui/material/Input';
import { mainFieldArray } from '../emplProfile/form/OfferForm2';

import classes from './Filters.module.css';
import SearchFilter from './SearchFilter';

const ControlInput = styled(MuiInput)`
  width: 50px;
`;

const Filters = () => {
  const dispatch = useAppDispatch();
  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(offersActions.setQueryObject({ experience: 'Senior' }));
  };
  const test2Handler = () => {
    dispatch(offersActions.setQueryObject({}));
  };
  const [value, setValue] = useState<number[]>([0, 50000]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], Number(value[1])), Number(value[1])]);
    } else {
      setValue([Number(value[0]), Math.max(newValue[1], Number(value[0]))]);
    }
  };
  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue([
      event.target.value === '' ? 0 : Number(event.target.value),
      value[1]
    ]);
  };
  const handleMinBlur = () => {
    if (value[0] < 0) {
      setValue([0, value[1]]);
    } else if (value[0] > value[1]) {
      setValue([0, value[1]]);
    }
  };
  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue([
      value[0],
      event.target.value === '' ? 0 : Number(event.target.value)
    ]);
  };
  const handleMaxBlur = () => {
    if (value[1] > 50000) {
      setValue([value[0], 50000]);
    } else if (value[1] < value[0]) {
      setValue([value[0], 50000]);
    }
  };
  return (
    <div className={classes.filter_list}>
      <form className={classes.filter_list__form} onSubmit={formSubmitHandler}>
        <SearchFilter searchFor="jobPosition" />
        <SearchFilter searchFor="location" />
        <label htmlFor="techSelect">Tech</label>
        <select name="techSelect">
          {mainFieldArray.map((mainField) => (
            <option key={mainFieldArray.indexOf(mainField)} value={mainField}>
              {mainField}
            </option>
          ))}
        </select>
        <div className={classes.form_input_salary}>
          <p>Salary range</p>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            disableSwap
            min={0}
            max={50000}
          />
          <div className={classes.form_input_salary__numbers}>
            <ControlInput
              value={value[0]}
              size="small"
              onChange={handleMinInputChange}
              onBlur={handleMinBlur}
              inputProps={{
                min: 0,
                max: 50000,
                'aria-labelledby': 'input-slider'
              }}
            />
            <ControlInput
              value={value[1]}
              size="small"
              onChange={handleMaxInputChange}
              onBlur={handleMaxBlur}
              inputProps={{
                min: 0,
                max: 50000,
                'aria-labelledby': 'input-slider'
              }}
            />
          </div>
        </div>
        <label htmlFor="employment">Form of employment</label>
        <select name="employment">
          <option>B2B</option>
          <option>UoP</option>
          <option>All</option>
        </select>
        <label htmlFor="experience">Seniority</label>
        <select name="experience">
          <option>Junior</option>
          <option>Mid</option>
          <option>Senior</option>
        </select>
        <label htmlFor="undisclosed">Undislosed salary</label>
        <select name="undisclosed">
          <option>yes</option>
          <option>no</option>
        </select>
        <label htmlFor="remote">Remote</label>
        <select name="remote">
          <option>yes</option>
          <option>no</option>
        </select>
        <Button styles={classes.CTA_button}>Filter</Button>
      </form>
      <Button onClick={test2Handler}>Clear filters</Button>
    </div>
  );
};

export default Filters;
