import { Fragment, useState } from "react";
import Button from "../../../UI/Button";
import OfferForm1 from "./OfferForm1";
import OfferForm2 from "./OfferForm2";
import OfferForm3 from "./OfferForm3";
import OfferForm4 from "./OfferForm4";
import OfferForm5 from "./OfferForm5";

import classes from "./OfferForm.module.css";

const OfferForm = () => {
  const [formNumber, setFormNumber] = useState(0);
  // i assumed there is 5 steps
  const calculateWidth = (value: number) => {
    return ((value - 1) / 5) * 100;
  };

  const incrementHandler = () => {
    setFormNumber((prevState) => prevState + 1);
  };
  const decrementHandler = () => {
    setFormNumber((prevState) => prevState - 1);
  };

  return (
    <Fragment>
      {formNumber === 0 && (
        <div>
          <h1>Here you can add new offers.</h1>
          <p>Start when you're ready!</p>
        </div>
      )}
      {formNumber !== 0 && (
        <div>
          <p>Completed: {Math.round(calculateWidth(formNumber))}%</p>
          <div className={classes.progress_bar}>
            <div
              className={classes.progress_bar__fill}
              style={{ width: calculateWidth(formNumber).toString() + "%" }}
            />
          </div>
        </div>
      )}
      {formNumber === 1 && (
        <OfferForm1
          onIncrement={incrementHandler}
          onDecrement={decrementHandler}
        />
      )}
      {formNumber === 2 && (
        <OfferForm2
          onIncrement={incrementHandler}
          onDecrement={decrementHandler}
        />
      )}
      {formNumber === 3 && (
        <OfferForm3
          onIncrement={incrementHandler}
          onDecrement={decrementHandler}
        />
      )}
      {formNumber === 4 && (
        <OfferForm4
          onIncrement={incrementHandler}
          onDecrement={decrementHandler}
        />
      )}
      {formNumber === 5 && (
        <OfferForm5
          onIncrement={incrementHandler}
          onDecrement={decrementHandler}
        />
      )}
      {formNumber === 6 && <p>End</p>}

      {formNumber === 0 && <Button onClick={incrementHandler}>Start</Button>}
      {formNumber === 6 && <Button onClick={decrementHandler}>Back</Button>}
      {formNumber === 6 && <Button>Add offer!</Button>}
    </Fragment>
  );
};

export default OfferForm;
