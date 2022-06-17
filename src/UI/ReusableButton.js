import classes from "./ReusableButton.module.css";

const ReusableButton = (props) => {
  return (
    <button className={`${classes.button} && ${props.styles}`} onClick={props.onClick} >
      {props.children}
    </button>
  );
};

export default ReusableButton;
