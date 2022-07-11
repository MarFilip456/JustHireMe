import React from "react";
import classes from "./Backdrop.module.css";

const Backdrop: React.FC<{
  styles: React.CSSProperties;
  onClick: (event: React.MouseEvent ) => void;
}> = (props) => {
  return (
    <div
      className={`${classes.backdrop} && ${props.styles}`}
      onClick={props.onClick}
    ></div>
  );
};

export default Backdrop;
