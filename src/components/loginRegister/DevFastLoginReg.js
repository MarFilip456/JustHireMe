import { Fragment } from "react/cjs/react.production.min";
import Button from "../../UI/Button";

import classes from "./DevFastLoginReg.module.css";

const DevFastLoginReg = (props) => {
  const fastLogin = [
    {
      id: "Google",
      img: "https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector.png",
      text: " with Google",
    },
    {
      id: "GitHub",
      img: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      text: " with GitHub",
    },
    {
      id: "LinkedIn",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png",
      text: " with LinkedIn",
    },
    {
      id: "Facebook",
      img: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
      text: " with Facebook",
    },
  ];
  return (
    <Fragment>
      {fastLogin.map((opt) => (
        <Button styles={classes.devLogin_form_login} act={props.act}>
          <img
            className={classes.devLogin_form}
            alt={`${opt.id} logo`}
            src={opt.img}
          />
          <p className={classes.devLogin_form}>
            {props.act} with {opt.id}
          </p>
        </Button>
      ))}
    </Fragment>
  );
};

export default DevFastLoginReg;
