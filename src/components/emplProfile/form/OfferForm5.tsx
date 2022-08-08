import { Fragment } from "react";
import Button from "../../../UI/Button";

const OfferForm5: React.FC<{
  onIncrement: (event: React.MouseEvent) => void;
  onDecrement: (event: React.MouseEvent) => void;
}> = (props) => {
  const nextStephandler = (event: React.MouseEvent) => {
    props.onIncrement(event);
  };
  const previousStepHandler = (event: React.MouseEvent) => {
    props.onDecrement(event);
  };
  return (
    <Fragment>
      <p>Fifth form</p>
      <Button onClick={previousStepHandler}>Back</Button>
      <Button onClick={nextStephandler}>Next</Button>
    </Fragment>
  );
};

export default OfferForm5;
