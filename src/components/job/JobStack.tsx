import { Fragment } from "react";
import { useAppSelector } from "../../store/redux-hooks";

import classes from "./JobStack.module.css";

const JobStack: React.FC = () => {
  const offer = useAppSelector((state) => state.offers.offers);
  const arrayTechStack = offer[0].techStack;

  return (
    <Fragment>
      <div className={classes.stack} ><h1>Tech Stack</h1></div>
      <div className={classes.stack_single}>
        {arrayTechStack.map((stack) => (
          <div key={Math.random()}>
            <h3>{stack.lang}</h3>
            <p>{stack.value}</p>
            <p>{stack.desc}</p>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default JobStack;
