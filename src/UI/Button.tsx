import React from "react";
import classes from "./Button.module.css";

const Button: React.FC<{
  styles?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
  act?: string;
}> = (props) => {
  return (
    <button
      className={`${classes.button} && ${props.styles}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
