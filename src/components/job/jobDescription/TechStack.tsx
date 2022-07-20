import { useAppSelector } from "../../../store/redux-hooks";

import classes from "./TechStack.module.css";

const TechStack: React.FC = () => {
  const offer = useAppSelector((state) => state.offers.offers);
  const arrayTechStack = offer[0].techStack;

  return (
    <div className={classes.offer_stack} >
      <div className={classes.stack}>
        <h1>Tech Stack</h1>
      </div>
      <div className={classes.stack_single}>
        {arrayTechStack.map((stack) => (
          <div key={Math.random()}>
            <h3>{stack.lang}</h3>
            <p>{stack.value}</p>
            <p>{stack.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
