import React, { Fragment, useRef } from "react";
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

  console.log(dev);

  const lang01Ref = useRef<HTMLOptionElement>(null);
  const lang02Ref = useRef<HTMLOptionElement>(null);
  const lang03Ref = useRef<HTMLOptionElement>(null);
  const lang04Ref = useRef<HTMLOptionElement>(null);
  const lang05Ref = useRef<HTMLOptionElement>(null);
  const lang06Ref = useRef<HTMLOptionElement>(null);

  if (finishedLoading) {
    
    console.log(lang03Ref);
    if (dev.mainLang === "JS") {
      lang01Ref.current!.selected = true;
    } else if (dev.mainLang === "HTML") {
      lang02Ref.current!.selected = true;
    } /* else if (dev.mainLang === "PHP" && refsAreNotUndefined) {
      lang03Ref.current!.selected = true;
    } */ else if (dev.mainLang === "Ruby") {
      lang04Ref.current!.selected = true;
    } else if (dev.mainLang === "Python") {
      lang05Ref.current!.selected = true;
    } else if (dev.mainLang === "Java") {
      lang06Ref.current!.selected = true;
    }
  }

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
              <textarea defaultValue={dev.aboutYou} />
            </Card>
            <Card>
              <h1>EXPERIENCE</h1>
              <p>Select your main language</p>
              <select
                name="languages"
                id="languages"
                defaultValue={dev.mainLang}
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
              </select>
              <p>How many years of experience do you have?</p>
              <label htmlFor="0-1">0-1 years</label>
              <input type="radio" id="0-1" name="exp" />
              <label htmlFor="1-2">1-2 years</label>
              <input type="radio" id="1-2" name="exp" />
              <label htmlFor="2-4">2-4 years</label>
              <input type="radio" id="2-4" name="exp" />
              <label htmlFor="4-6">4-6 years</label>
              <input type="radio" id="4-6" name="exp" />
              <label htmlFor="6-10">6-10 years</label>
              <input type="radio" id="6-10" name="exp" />
              <label htmlFor="10+">10+ years</label>
              <input type="radio" id="10+" name="exp" />
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
