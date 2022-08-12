import React from 'react'
import classes from './Card.module.css'

const Card: React.FC<{
  styles?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
}> = (props) => {
  return (
    <div
      className={`${classes.card} && ${props.styles}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}

export default Card
