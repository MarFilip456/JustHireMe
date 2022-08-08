import { Fragment } from "react";
import Button from "../../../UI/Button";

const OfferForm3: React.FC<{
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
      <p>Third form</p>
      <form>
        
      </form>
      <Button onClick={previousStepHandler}>Back</Button>
      <Button onClick={nextStephandler}>Next</Button>
    </Fragment>
  );
};

export default OfferForm3;
