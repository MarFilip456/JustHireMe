import { useAppSelector } from "../../../store/redux-hooks";

import classes from "./TechStack.module.css";

const TechStack: React.FC = () => {
  const offer = useAppSelector((state) => state.offers.offers);
  const arrayTechStack = offer[0].techStack;

  const stackDesc = (value: number) => {
    if (value === 1) {
      return "nice to have";
    } else if (value === 2) {
      return "junior";
    } else if (value === 3) {
      return "regular";
    } else if (value === 4) {
      return "advanced";
    } else {
      return "master";
    }
  };

  const calculateWidth = (value: number) => {
    return ((value / 5) * 100).toString() + "%";
  };

  return (
    <div className={classes.offer_stack}>
      <div className={classes.stack}>
        <h1>Tech Stack</h1>
      </div>
      <div className={classes.stack_single}>
        {arrayTechStack!.map((stack) => (
          <div key={Math.random()}>
            <h3>{stack.lang}</h3>
            <div className={classes.stack_container}>
              <div
                className={classes.stack_filler}
                style={{ width: calculateWidth(stack.value) }}
              />
            </div>
            <p>{stackDesc(stack.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
