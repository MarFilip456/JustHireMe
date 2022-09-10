import React, { Fragment } from 'react';
import Backdrop from './Backdrop';

const Modal: React.FC<{
  styles?: React.CSSProperties;
  onClick: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
}> = (props) => {
  return (
    <Fragment>
      <Backdrop onClick={props.onClick} styles={props.styles} />
      {props.children}
    </Fragment>
  );
};

export default Modal;
