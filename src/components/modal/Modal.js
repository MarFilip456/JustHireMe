import { Fragment } from "react/cjs/react.production.min";
import Backdrop from "./Backdrop";

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop onClick={props.onClick} styles={props.styles} />
      {props.children}
    </Fragment>
  );
};

export default Modal;
