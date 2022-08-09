import React, { Fragment } from "react";
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

  const mainLangArray = [
    "JS",
    "HTML",
    "PHP",
    "Ruby",
    "Python",
    "Java",
    ".Net",
    "Scala",
    "C",
    "Mobile",
    "Testing",
    "DevOps",
    "Admin",
    "UX/UI",
    "PM",
    "Game",
    "Analytics",
    "Security",
    "Data",
    "Go",
    "Support",
    "ERP",
    "Architecture",
    "Other",
  ];
  const experienceArray = ["0-1", "1-2", "2-4", "4-6", "6-10", "10+"];

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
                defaultValue={dev.mainLang}
              >
                {mainLangArray.map((mainLang) => (
                  <option
                    key={mainLangArray.indexOf(mainLang)}
                    value={mainLang}
                  >
                    {mainLang}
                  </option>
                ))}
              </select>
              <p>How many years of experience do you have?</p>
              {experienceArray.map((exp) => (
                <Fragment key={experienceArray.indexOf(exp)}>
                  <label htmlFor="exp">{exp}</label>
                  <input
                    type="radio"
                    name="exp"
                    value={exp}
                    defaultChecked={dev.experience === exp}
                  />
                </Fragment>
              ))}
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
