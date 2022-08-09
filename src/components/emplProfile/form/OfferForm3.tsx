import { Fragment, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";
import { offersActions } from "../../../store/offers-slice";
import Button from "../../../UI/Button";

const OfferForm3: React.FC<{
  onIncrement: (event: React.MouseEvent) => void;
  onDecrement: (event: React.MouseEvent) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offers.addingOffer);
  
  const previousStepHandler = (event: React.MouseEvent) => {
    props.onDecrement(event);
  };

  const nextStephandler = (event: React.MouseEvent) => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          employment: {
            undisclosed: undisclosed,
            b2b: {
              maxSalary: b2bSalaryMaxRef.current?.value,
              minSalary: b2bSalaryMinRef.current?.value,
            },
            uop: {
              maxSalary: uopSalaryMaxRef.current?.value,
              minSalary: uopSalaryMinRef.current?.value,
            },
          },
        })
      )
    );
    props.onIncrement(event);
  };

  const defaultAllowedUop = offer.employment?.uop?.minSalary ? true : false;
  const defaultAllowedB2b = offer.employment?.b2b?.minSalary ? true : false;
  const defaultUndisclosed = offer.employment?.undisclosed
    ? offer.employment.undisclosed
    : false;

  const [undisclosed, setUndisclosed] = useState(defaultUndisclosed);

  const [uop, setUop] = useState(defaultAllowedUop);
  const uopSalaryMinRef = useRef<HTMLInputElement>(null);
  const uopSalaryMaxRef = useRef<HTMLInputElement>(null);

  const [b2b, setB2b] = useState(defaultAllowedB2b);
  const b2bSalaryMinRef = useRef<HTMLInputElement>(null);
  const b2bSalaryMaxRef = useRef<HTMLInputElement>(null);

  const setUndisclosedTrueHandler = () => {
    setUndisclosed(true);
    setUop(false);
    setB2b(false);
  };
  const setUndisclosedFalseHandler = () => {
    setUndisclosed(false);
  };

  const setUopHandler = () => {
    setUop((prevState) => !prevState);
  };
  const setB2bHandler = () => {
    setB2b((prevState) => !prevState);
  };

  return (
    <Fragment>
      <p>Third form</p>
      <form>
        <p>Undisclosed salary?</p>
        <label htmlFor="undisclosed">Yes</label>
        <input
          name="undisclosed"
          type="radio"
          value="yes"
          onChange={setUndisclosedTrueHandler}
          defaultChecked={undisclosed}
        />
        <label htmlFor="undisclosed">No</label>
        <input
          name="undisclosed"
          type="radio"
          value="no"
          onChange={setUndisclosedFalseHandler}
          defaultChecked={!undisclosed}
        />
        {!undisclosed && (
          <Fragment>
            <label htmlFor="setUop">Set salary range for UoP</label>
            <input
              name="setUop"
              type="checkbox"
              onChange={setUopHandler}
              defaultChecked={uop}
            />
            {uop && (
              <div>
                <label htmlFor="uopSalaryMin">Minimum salary</label>
                <input
                  name="uopSalaryMin"
                  type="number"
                  ref={uopSalaryMinRef}
                  defaultValue={
                    offer.employment?.uop ? offer.employment.uop.minSalary : 0
                  }
                />
                <label htmlFor="uopSalaryMax">Maximum salary</label>
                <input
                  name="uopSalaryMax"
                  type="number"
                  ref={uopSalaryMaxRef}
                  defaultValue={
                    offer.employment?.uop ? offer.employment.uop.maxSalary : 0
                  }
                />
              </div>
            )}
            <label htmlFor="setB2b">Set salary range for B2B</label>
            <input
              name="setB2b"
              type="checkbox"
              onChange={setB2bHandler}
              defaultChecked={b2b}
            />
            {b2b && (
              <div>
                <label htmlFor="b2bSalaryMin">Minimum salary</label>
                <input
                  name="b2bSalaryMin"
                  type="number"
                  ref={b2bSalaryMinRef}
                  defaultValue={
                    offer.employment?.b2b ? offer.employment.b2b.minSalary : 0
                  }
                />
                <label htmlFor="b2bSalaryMax">Maximum salary</label>
                <input
                  name="b2bSalaryMax"
                  type="number"
                  ref={b2bSalaryMaxRef}
                  defaultValue={
                    offer.employment?.b2b ? offer.employment.b2b.maxSalary : 0
                  }
                />
              </div>
            )}
          </Fragment>
        )}
      </form>
      <Button onClick={previousStepHandler}>Back</Button>
      <Button onClick={nextStephandler}>Next</Button>
    </Fragment>
  );
};

export default OfferForm3;
