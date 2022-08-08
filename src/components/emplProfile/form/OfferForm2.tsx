import React, { Fragment, useRef } from "react";
import Button from "../../../UI/Button";
import { useAppSelector, useAppDispatch } from "../../../store/redux-hooks";
import { offersActions } from "../../../store/offers-slice";

const OfferForm2: React.FC<{
  onIncrement: (event: React.MouseEvent) => void;
  onDecrement: (event: React.MouseEvent) => void;
}> = (props) => {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offers.addingOffer);

  const previousStepHandler = (event: React.MouseEvent) => {
    props.onDecrement(event);
  };

  const nextStephandler = (event: React.MouseEvent) => {
    dispatch(
      offersActions.addOffer(
        Object.assign({}, offer, {
          jobPosition: jobPositionRef.current!.value,
          expLevel: experienceRef.current!.value,
          mainLang: mainLangRef.current!.value,
        })
      )
    );
    props.onIncrement(event);
  };

  const jobPositionRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLSelectElement>(null);
  const mainLangRef = useRef<HTMLSelectElement>(null);

  return (
    <Fragment>
      <p>Second form</p>
      <form>
        <label htmlFor="jobPosition">Position</label>
        <input
          name="jobPosition"
          type="text"
          defaultValue={offer.jobPosition}
          ref={jobPositionRef}
        />
        <label htmlFor="mainLang">Main language</label>
        <input
          name="mainLang"
          type="text"
          placeholder="Selected main language"
          value={offer.mainLang}
          readOnly
        />
        <select name="mainLang" ref={mainLangRef}>
          <option value="">Change</option>
          <option value="js">JS</option>
          <option value="html">HTML</option>
          <option value="php">PHP</option>
          <option value="ruby">Ruby</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value=".net">.Net</option>
          <option value="scala">Scala</option>
          <option value="c">C</option>
          <option value="mobile">Mobile</option>
          <option value="testing">Testing</option>
          <option value="devOps">DevOps</option>
          <option value="admin">Admin</option>
          <option value="ux/ui">UX/UI</option>
          <option value="pm">PM</option>
          <option value="game">Game</option>
          <option value="analytics">Analytics</option>
          <option value="security">Security</option>
          <option value="data">Data</option>
          <option value="go">Go</option>
          <option value="support">Support</option>
          <option value="erp">ERP</option>
          <option value="architecture">Architecture</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="experience">Experience</label>
        <input
          name="experience"
          type="text"
          placeholder="Selected experience"
          value={offer.expLevel}
          readOnly
        />
        <select name="experience" ref={experienceRef}>
          <option value="">Change</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
          <option value="expert">Expert</option>
        </select>
      </form>
      <Button onClick={previousStepHandler}>Back</Button>
      <Button onClick={nextStephandler}>Next</Button>
    </Fragment>
  );
};

export default OfferForm2;
