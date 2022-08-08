import React, { Fragment, useEffect, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import userIcon from "../images/userIcon.png";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useAppSelector } from "../store/redux-hooks";

import useFilterDevs from "../hooks/use-filterDevs";

const DevPage = () => {
  const profileUpdateHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const loadingState = useAppSelector((state) => state.ui.isLoading);
  const dev = useAppSelector((state) => state.devs.devs[0]);
  const finishedLoading: boolean = !loadingState && dev !== undefined;
  const loggedDev = [{ id: localStorage.getItem("justHireMeId")! }];
  useFilterDevs(loggedDev);

  const lang01Ref = useRef<HTMLOptionElement>(null);
  const lang02Ref = useRef<HTMLOptionElement>(null);
  const lang03Ref = useRef<HTMLOptionElement>(null);
  const lang04Ref = useRef<HTMLOptionElement>(null);
  const lang05Ref = useRef<HTMLOptionElement>(null);
  const lang06Ref = useRef<HTMLOptionElement>(null);
  const lang07Ref = useRef<HTMLOptionElement>(null);
  const lang08Ref = useRef<HTMLOptionElement>(null);
  const lang09Ref = useRef<HTMLOptionElement>(null);
  const lang10Ref = useRef<HTMLOptionElement>(null);
  const lang11Ref = useRef<HTMLOptionElement>(null);
  const lang12Ref = useRef<HTMLOptionElement>(null);
  const lang13Ref = useRef<HTMLOptionElement>(null);
  const lang14Ref = useRef<HTMLOptionElement>(null);
  const lang15Ref = useRef<HTMLOptionElement>(null);
  const lang16Ref = useRef<HTMLOptionElement>(null);
  const lang17Ref = useRef<HTMLOptionElement>(null);
  const lang18Ref = useRef<HTMLOptionElement>(null);
  const lang19Ref = useRef<HTMLOptionElement>(null);
  const lang20Ref = useRef<HTMLOptionElement>(null);
  const lang21Ref = useRef<HTMLOptionElement>(null);
  const lang22Ref = useRef<HTMLOptionElement>(null);
  const lang23Ref = useRef<HTMLOptionElement>(null);
  const lang24Ref = useRef<HTMLOptionElement>(null);

  useEffect(() => {
    if (finishedLoading) {
      if (dev.mainLang === "JS") {
        lang01Ref.current!.selected = true;
      } else if (dev.mainLang === "HTML") {
        lang02Ref.current!.selected = true;
      } else if (dev.mainLang === "PHP") {
        lang03Ref.current!.selected = true;
      } else if (dev.mainLang === "Ruby") {
        lang04Ref.current!.selected = true;
      } else if (dev.mainLang === "Python") {
        lang05Ref.current!.selected = true;
      } else if (dev.mainLang === "Java") {
        lang06Ref.current!.selected = true;
      } else if (dev.mainLang === ".net") {
        lang07Ref.current!.selected = true;
      } else if (dev.mainLang === "scala") {
        lang08Ref.current!.selected = true;
      } else if (dev.mainLang === "c") {
        lang09Ref.current!.selected = true;
      } else if (dev.mainLang === "mobile") {
        lang10Ref.current!.selected = true;
      } else if (dev.mainLang === "testing") {
        lang11Ref.current!.selected = true;
      } else if (dev.mainLang === "devOps") {
        lang12Ref.current!.selected = true;
      } else if (dev.mainLang === "admin") {
        lang13Ref.current!.selected = true;
      } else if (dev.mainLang === "ux/ui") {
        lang14Ref.current!.selected = true;
      } else if (dev.mainLang === "pm") {
        lang15Ref.current!.selected = true;
      } else if (dev.mainLang === "game") {
        lang16Ref.current!.selected = true;
      } else if (dev.mainLang === "analytics") {
        lang17Ref.current!.selected = true;
      } else if (dev.mainLang === "security") {
        lang18Ref.current!.selected = true;
      } else if (dev.mainLang === "data") {
        lang19Ref.current!.selected = true;
      } else if (dev.mainLang === "go") {
        lang20Ref.current!.selected = true;
      } else if (dev.mainLang === "support") {
        lang21Ref.current!.selected = true;
      } else if (dev.mainLang === "erp") {
        lang22Ref.current!.selected = true;
      } else if (dev.mainLang === "architecture") {
        lang23Ref.current!.selected = true;
      } else if (dev.mainLang === "other") {
        lang24Ref.current!.selected = true;
      } 
    }
  }, [finishedLoading, dev]);

  const exp01Ref = useRef<HTMLInputElement>(null);
  const exp02Ref = useRef<HTMLInputElement>(null);
  const exp03Ref = useRef<HTMLInputElement>(null);
  const exp04Ref = useRef<HTMLInputElement>(null);
  const exp05Ref = useRef<HTMLInputElement>(null);
  const exp06Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (finishedLoading) {
      if (dev.experience === "0-1") {
        exp01Ref.current!.checked = true;
      } else if (dev.experience === "1-2") {
        exp02Ref.current!.checked = true;
      } else if (dev.experience === "2-4") {
        exp03Ref.current!.checked = true;
      } else if (dev.experience === "4-6") {
        exp04Ref.current!.checked = true;
      } else if (dev.experience === "6-10") {
        exp05Ref.current!.checked = true;
      } else if (dev.experience === "10+") {
        exp06Ref.current!.checked = true;
      }
    }
  }, [finishedLoading, dev]);

  return (
    <Fragment>
      {loadingState && <LoadingSpinner />}
      {finishedLoading && (
        <div>
          <p>My profile</p>
          <form onSubmit={profileUpdateHandler}>
            <Card>
              <h1>USER DETAILS</h1>
              <div>
                <img
                  width="80px"
                  height="80px"
                  alt="user_image"
                  src={dev.logo ? dev.logo : userIcon}
                />
              </div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={dev.name}
              />
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                id="surname"
                name="surname"
                defaultValue={dev.surname}
              />
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={dev.email}
              />
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={dev.location}
              />
              <label htmlFor="aboutYou">Introduce yourself</label>
              <textarea defaultValue={dev.aboutYou} maxLength={50} />
            </Card>
            <Card>
              <h1>EXPERIENCE</h1>
              <p>Select your main language</p>
              <select
                name="languages"
                id="languages"
              >
                <option value="js" ref={lang01Ref}>
                  JS
                </option>
                <option value="html" ref={lang02Ref}>
                  HTML
                </option>
                <option value="php" ref={lang03Ref}>
                  PHP
                </option>
                <option value="ruby" ref={lang04Ref}>
                  Ruby
                </option>
                <option value="python" ref={lang05Ref}>
                  Python
                </option>
                <option value="java" ref={lang06Ref}>
                  Java
                </option>
                <option value=".net" ref={lang07Ref}>
                  .Net
                </option>
                <option value="scala" ref={lang08Ref}>
                  Scala
                </option>
                <option value="c" ref={lang09Ref}>
                  C
                </option>
                <option value="mobile" ref={lang10Ref}>
                  Mobile
                </option>
                <option value="testing" ref={lang11Ref}>
                  Testing
                </option>
                <option value="devOps" ref={lang12Ref}>
                  DevOps
                </option>
                <option value="admin" ref={lang13Ref}>
                  Admin
                </option>
                <option value="ux/ui" ref={lang14Ref}>
                  UX/UI
                </option>
                <option value="pm" ref={lang15Ref}>
                  PM
                </option>
                <option value="game" ref={lang16Ref}>
                  Game
                </option>
                <option value="analytics" ref={lang17Ref}>
                  Analytics
                </option>
                <option value="security" ref={lang18Ref}>
                  Security
                </option>
                <option value="data" ref={lang19Ref}>
                  Data
                </option>
                <option value="go" ref={lang20Ref}>
                  Go
                </option>
                <option value="support" ref={lang21Ref}>
                  Support
                </option>
                <option value="erp" ref={lang22Ref}>
                  ERP
                </option>
                <option value="architecture" ref={lang23Ref}>
                  Architecture
                </option>
                <option value="other" ref={lang24Ref}>
                  Other
                </option>
              </select>
              <p>How many years of experience do you have?</p>
              <label htmlFor="0-1">0-1 years</label>
              <input type="radio" id="0-1" name="exp" ref={exp01Ref} />
              <label htmlFor="1-2">1-2 years</label>
              <input type="radio" id="1-2" name="exp" ref={exp02Ref} />
              <label htmlFor="2-4">2-4 years</label>
              <input type="radio" id="2-4" name="exp" ref={exp03Ref} />
              <label htmlFor="4-6">4-6 years</label>
              <input type="radio" id="4-6" name="exp" ref={exp04Ref} />
              <label htmlFor="6-10">6-10 years</label>
              <input type="radio" id="6-10" name="exp" ref={exp05Ref} />
              <label htmlFor="10+">10+ years</label>
              <input type="radio" id="10+" name="exp" ref={exp06Ref} />
            </Card>
            <Card>
              <h1>SOCIAL LINKS</h1>
              <label htmlFor="github">GitHub</label>
              <input
                id="github"
                name="github"
                type="text"
                defaultValue={dev.gitHub}
              />
              <label htmlFor="linkedin">LinkedIn</label>
              <input
                id="linkedin"
                name="linkedin"
                type="text"
                defaultValue={dev.linkedIn}
              />
            </Card>
            <Button>Update profile</Button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default DevPage;
