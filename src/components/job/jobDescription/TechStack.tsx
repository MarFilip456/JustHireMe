import { techStackType } from "../../../store/offers-slice";

import classes from "./TechStack.module.css";

const TechStack: React.FC<{offerArray: techStackType[]}> = (props) => {
  const arrayTechStack = props.offerArray;

  const stackDesc = (value: string) => {
    if (value === "nice to have") {
      return 1;
    } else if (value === "junior") {
      return 2;
    } else if (value === "regular") {
      return 3;
    } else if (value === "advanced") {
      return 4;
    } else {
      return 5;
    }
  };

  const calculateWidth = (value: string) => {
    return ((stackDesc(value) / 5) * 100).toString() + "%";
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
            <p>{stack.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
