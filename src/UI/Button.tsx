import React from 'react';
import classes from './Button.module.css';

const Button: React.FC<{
  styles?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
  act?: string;
  id?: string;
}> = (props) => {
  return (
    <button
    id={props.id}
      className={`${classes.button} && ${props.styles}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
