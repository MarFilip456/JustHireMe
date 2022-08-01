import Card from "../../UI/Card";

import classes from "./DevShort.module.css";
import userIcon from "../../images/userIcon.png";

const DevShort: React.FC<{
  onClick?: (event: React.MouseEvent) => void;

  name?: string;
  surname?: string;
  logo?: string;
  email?: string;
  experience?: string;
  mainLang?: string;
  location?: string;
  aboutYou?: string;
  gitHub?: string;
  linkedIn?: string;
  id: string;
  key: string;
}> = (props) => {
  const filledName = props.name && props.surname;
  return (
    <Card styles={classes.job_short__container} onClick={props.onClick}>
      <img
        alt={"company_logo"}
        src={props.logo ? props.logo : userIcon}
        className={classes.job_short_img}
      />
      <div className={classes.job_short_cont1}>
        <h1 className={classes.job_short_company}>
          {filledName ? `${props.name} ${props.surname}` : "Anonymuos applier"}
        </h1>
        <h2 className={classes.job_short__salary}>
          {props.experience ? `${props.experience} years of experience` : "Unknown experience"}
        </h2>
      </div>
      <div className={classes.job_short_cont2}>
        <div>{props.mainLang ? props.mainLang : "Unknown main"}</div>
        <h2 className={classes.job_short__location}>
          {props.location ? props.location : "Unknown location"}
        </h2>
      </div>
    </Card>
  );
};

export default DevShort;
