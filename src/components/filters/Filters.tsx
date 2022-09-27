import React, { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { offersActions } from '../../store/offers-slice';
import Button from '../../UI/Button';
import { Slider, styled } from '@mui/material';
import MuiInput from '@mui/material/Input';
import { mainFieldArray } from '../emplProfile/form/OfferForm2';

import classes from './Filters.module.css';
import SearchFilter from './SearchFilter';
import { uiActions } from '../../store/ui-slice';

const ControlInput = styled(MuiInput)`
  width: 50px;
`;

const Filters = () => {
  const dispatch = useAppDispatch();
  const savedQueryObject = useAppSelector((state) => state.offers.queries);

  const [value, setValue] = useState<number[]>([
    savedQueryObject.minSalary ? savedQueryObject.minSalary : 0,
    savedQueryObject.maxSalary ? savedQueryObject.maxSalary : 50000
  ]);

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

  const searchPositionRef = useRef<HTMLInputElement>(null);
  const searchLocationRef = useRef<HTMLInputElement>(null);
  const techRef = useRef<HTMLSelectElement>(null);
  const employmentRef = useRef<HTMLSelectElement>(null);
  const experienceRef = useRef<HTMLSelectElement>(null);
  const remoteRef = useRef<HTMLSelectElement>(null);

  const clearFiltersHandler = () => {
    dispatch(
      offersActions.setQueryObject({
        undisclosed: savedQueryObject.undisclosed
      })
    );
    setValue([0, 50000]);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      offersActions.setQueryObject(
        Object.assign({}, savedQueryObject, {
          search:
            searchPositionRef.current?.value.trim().length !== 0
              ? searchPositionRef.current?.value.trim()
              : undefined,
          location:
            searchLocationRef.current?.value.trim().length !== 0
              ? searchLocationRef.current?.value
              : undefined,
          mainField:
            techRef.current?.value !== 'All'
              ? techRef.current?.value
              : undefined,
          minSalary: value[0] === 0 ? undefined : value[0],
          maxSalary: value[1] === 50000 ? undefined : value[1],
          employment:
            employmentRef.current?.value !== 'All'
              ? employmentRef.current?.value
              : undefined,
          experience:
            experienceRef.current?.value !== 'All'
              ? experienceRef.current?.value
              : undefined,
          remote:
            remoteRef.current?.value === 'yes'
              ? remoteRef.current?.value
              : undefined
        })
      )
    );
    dispatch(uiActions.changeVisFilter());
  };

  return (
    <div className={classes.filter_list}>
      <form className={classes.filter_list__form} onSubmit={formSubmitHandler}>
        <SearchFilter
          refObject={searchPositionRef}
          defaultProp={
            savedQueryObject.search ? savedQueryObject.search : undefined
          }
          searchFor="jobPosition"
        />
        <SearchFilter
          refObject={searchLocationRef}
          defaultProp={savedQueryObject.location}
          searchFor="location"
        />
        <div className={classes.filter_list__mainField}>
          <label htmlFor="techSelect">Tech</label>
          <select
            name="techSelect"
            ref={techRef}
            defaultValue={savedQueryObject.mainField}
          >
            <option value="All">All</option>
            {mainFieldArray.map((mainField) => (
              <option key={mainFieldArray.indexOf(mainField)} value={mainField}>
                {mainField}
              </option>
            ))}
          </select>
        </div>
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
            step={1000}
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
        <select
          name="employment"
          ref={employmentRef}
          defaultValue={savedQueryObject.employment}
        >
          <option value="All">All</option>
          <option value="b2b">B2B</option>
          <option value="uop">UoP</option>
        </select>
        <label htmlFor="experience">Seniority</label>
        <select
          name="experience"
          ref={experienceRef}
          defaultValue={savedQueryObject.experience}
        >
          <option value="All">All</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
          <option value="Expert">Expert</option>
        </select>
        {/* <label htmlFor="undisclosed">With salary</label>
        <select
          name="undisclosed"
          ref={undisclosedRef}
          defaultValue={
            savedQueryObject.undisclosed !== undefined ? 'yes' : 'all'
          }
        >
          <option value="all">all</option>
          <option value="yes">yes</option>
        </select> */}
        <label htmlFor="remote">Remote</label>
        <select
          name="remote"
          ref={remoteRef}
          defaultValue={savedQueryObject.remote}
        >
          <option value="All">not valid</option>
          <option value="yes">yes</option>
        </select>
        <Button styles={classes.CTA_button}>Filter</Button>
      </form>
      <Button onClick={clearFiltersHandler}>Clear filters</Button>
    </div>
  );
};

export default Filters;
