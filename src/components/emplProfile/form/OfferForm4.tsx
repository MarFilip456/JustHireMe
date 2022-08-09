import React, { Fragment, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/redux-hooks";
import { offersActions } from "../../../store/offers-slice";
import Button from "../../../UI/Button";

const OfferForm4: React.FC<{
  onIncrement: (event: React.MouseEvent) => void;
  onDecrement: (event: React.MouseEvent) => void;
}> = (props) => {
  const dispatch = useAppDispatch();

  const previousStepHandler = (event: React.MouseEvent) => {
    props.onDecrement(event);
  };

  const offer = useAppSelector((state) => state.offers.addingOffer);

  const nextStephandler = (event: React.MouseEvent) => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          techStack: stackArray,
        })
      )
    );
    props.onIncrement(event);
  };

  const [techLang, setTechLang] = useState("");
  const [techValue, setTechValue] = useState("");

  const techLangHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTechLang(event.target.value);
  };

  const techValueHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTechValue(event.target.value);
  };

  interface techStackType {
    lang: string;
    value: number;
  }

  const [stackArray, setStackArray] =
    useState<techStackType[]>(offer.techStack ? offer.techStack : []);

  const addtechStackhandler = () => {
    setStackArray([
      ...stackArray,
      {
        lang: techLang,
        value: Number(techValue),
      },
    ]);
    setTechLang("");
    setTechValue("");
  };

  const deleteTechStackHandler = (event: React.MouseEvent) => {
    console.log(event);
    /* stackArray.filter((stack)=>(stack.lang!==event.target)) */
  };

  return (
    <Fragment>
      <p>Fourth form</p>
      <div>
        <p>Add required:</p>
        <label htmlFor="lang">skill</label>
        <input
          type="text"
          name="lang"
          value={techLang}
          onChange={techLangHandler}
        />
        <label htmlFor="value">knowledge</label>
        <select name="value" value={techValue} onChange={techValueHandler}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <Button onClick={addtechStackhandler}>Add tech stack</Button>
      {stackArray.length > 0 &&
        stackArray.map((tech) => (
          <div key={`${tech.lang}_${tech.value}`}>
            <p>{tech.lang}</p>
            <p>{tech.value}</p>
            <Button key={tech.lang} onClick={deleteTechStackHandler}>Delete</Button>
          </div>
        ))}
      <Button onClick={previousStepHandler}>Back</Button>
      <Button onClick={nextStephandler}>Next</Button>
    </Fragment>
  );
};

export default OfferForm4;
