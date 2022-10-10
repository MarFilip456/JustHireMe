import React, { Fragment, useRef, useEffect } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useAppDispatch } from '../store/redux-hooks';
import { uiActions } from '../store/ui-slice';
import { mainFieldArray } from '../components/emplProfile/form/FormPositionInfo';

import useSingleUser from '../hooks/use-singleUser';
import axios from 'axios';

import classes from './DevPage.module.css';

const DevPage = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useSingleUser();

  useEffect(() => {
    if (isError) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.setInformationError());
      dispatch(uiActions.showInformation('Could not fetch user data!'));
    }
  }, [isError]);
  const dev = data;
  const token = localStorage.getItem('justHireMeToken');
  const finishedLoading: boolean = !isLoading && dev !== null;

  const experienceArray = ['0-1', '1-2', '2-4', '4-6', '6-10', '10+'];

  const profileUpdateHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateObject = {
      name: devNameRef.current?.value,
      surname: devSurnameRef.current?.value,
      logoUrl: devLogoRef.current?.value,
      experience: devExperienceRef.current?.value,
      mainLang: devMainLangRef.current?.value,
      location: devLocationRef.current?.value,
      aboutYou: devAboutYouRef.current?.value,
      gitHubUrl: devGitHubRef.current?.value,
      linkedInUrl: devLinkedInRef.current?.value
    };
    const url = process.env.REACT_APP_API_ADRESS;
    axios
      .patch(url!.concat(`/auth/${dev!.id}`), updateObject, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(uiActions.showInformation('Profile updated!'));
          dispatch(uiActions.changeInformationPopup());
        }
      })
      .catch((error) => {
        dispatch(uiActions.showInformation(`Error occured: ${error.message}`));
        dispatch(uiActions.setInformationError());
        dispatch(uiActions.changeInformationPopup());
      });
  };
  const devLogoRef = useRef<HTMLInputElement>(null);
  const devNameRef = useRef<HTMLInputElement>(null);
  const devSurnameRef = useRef<HTMLInputElement>(null);
  const devLocationRef = useRef<HTMLInputElement>(null);
  const devAboutYouRef = useRef<HTMLTextAreaElement>(null);
  const devMainLangRef = useRef<HTMLSelectElement>(null);
  const devExperienceRef = useRef<HTMLSelectElement>(null);
  const devGitHubRef = useRef<HTMLInputElement>(null);
  const devLinkedInRef = useRef<HTMLInputElement>(null);
  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {finishedLoading && (
        <div className={classes.devPage_main}>
          <form
            onSubmit={profileUpdateHandler}
            className={classes.devPage_main__form}
          >
            <div className={classes.mainPage_main__form_container}>
              <Card styles={classes.devPage_card}>
                <div>
                  <h3>USER DETAILS</h3>
                  <div className={classes.devPage_imageContainer}>
                    {dev?.logoUrl === undefined || dev?.logoUrl === ''
                      ? (
                      <svg
                        width="48"
                        height="48"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M10.25 13c0 .69-.56 1.25-1.25 1.25S7.75 13.69 7.75 13s.56-1.25 1.25-1.25 1.25.56 1.25 1.25zM15 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm7 .25c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM10.66 4.12C12.06 6.44 14.6 8 17.5 8c.46 0 .91-.05 1.34-.12C17.44 5.56 14.9 4 12 4c-.46 0-.91.05-1.34.12zM4.42 9.47c1.71-.97 3.03-2.55 3.66-4.44C6.37 6 5.05 7.58 4.42 9.47zM20 12c0-.78-.12-1.53-.33-2.24-.7.15-1.42.24-2.17.24-3.13 0-5.92-1.44-7.76-3.69C8.69 8.87 6.6 10.88 4 11.86c.01.04 0 .09 0 .14 0 4.41 3.59 8 8 8s8-3.59 8-8z"></path>
                      </svg>
                        )
                      : (
                      <img
                        width="80px"
                        height="80px"
                        alt="user_image"
                        src={dev!.logoUrl}
                      />
                        )}
                  </div>
                </div>
                <div className={classes.card_inputContainer}>
                  <div className={classes.card_inputContainer__label}>
                    <label htmlFor="logoUrl">Logo url</label>
                  </div>
                  <div className={classes.card_inputContainer__input}>
                    <input
                      type="text"
                      id="logoUrl"
                      name="logoUrl"
                      defaultValue={dev!.logoUrl}
                      ref={devLogoRef}
                      placeholder="https://www.example.com/image.png"
                    />
                  </div>
                </div>
                <div>
                  <div className={classes.card_inputContainer}>
                    <div className={classes.card_inputContainer__label}>
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className={classes.card_inputContainer__input}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={dev!.name}
                        ref={devNameRef}
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className={classes.card_inputContainer}>
                    <div className={classes.card_inputContainer__label}>
                      <label htmlFor="surname">Surname</label>
                    </div>
                    <div className={classes.card_inputContainer__input}>
                      <input
                        type="text"
                        id="surname"
                        name="surname"
                        defaultValue={dev!.surname}
                        ref={devSurnameRef}
                        placeholder="Surname"
                      />
                    </div>
                  </div>
                  <div className={classes.card_inputContainer}>
                    <div className={classes.card_inputContainer__label}>
                      <label htmlFor="email">E-mail</label>
                    </div>
                    <div className={classes.card_inputContainer__input}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={dev!.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className={classes.card_inputContainer}>
                    <div className={classes.card_inputContainer__label}>
                      <label htmlFor="city">City</label>
                    </div>
                    <div className={classes.card_inputContainer__input}>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        defaultValue={dev!.location}
                        ref={devLocationRef}
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <div className={classes.card_inputContainer}>
                    <div className={classes.card_inputContainer__label}>
                      <label htmlFor="aboutYou">About you</label>
                    </div>
                    <textarea
                      className={classes.card_inputContainer__textarea}
                      defaultValue={dev!.aboutYou}
                      maxLength={100}
                      ref={devAboutYouRef}
                      placeholder="Introduce yourself"
                    />
                  </div>
                </div>
              </Card>
              <Card styles={classes.devPage_card}>
                <h3>EXPERIENCE</h3>
                <div className={classes.card_inputContainer}>
                  <div className={classes.card_inputContainer__label}>
                    <label htmlFor="languages">Select your main language</label>
                  </div>
                  <div className={classes.card_inputContainer__select}>
                    <select
                      className={classes.card_inputContainer__select}
                      name="languages"
                      id="languages"
                      defaultValue={dev!.mainLang}
                      ref={devMainLangRef}
                    >
                      {mainFieldArray.map((mainLang) => (
                        <option
                          key={mainFieldArray.indexOf(mainLang)}
                          value={mainLang}
                        >
                          {mainLang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={classes.card_inputContainer}>
                  <div className={classes.card_inputContainer__label}>
                    <label htmlFor="exp">Years of experience</label>
                  </div>
                  <div className={classes.card_inputContainer__select}>
                    <select
                      className={classes.card_inputContainer__select}
                      name="exp"
                      id="exp"
                      defaultValue={dev!.experience}
                      ref={devExperienceRef}
                    >
                      {experienceArray.map((exp) => (
                        <option key={experienceArray.indexOf(exp)} value={exp}>
                          {exp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </Card>
              <Card styles={classes.devPage_card}>
                <h3>SOCIAL LINKS</h3>
                <div className={classes.card_inputContainer}>
                  <div className={classes.card_inputContainer__label}>
                    <label htmlFor="github">GitHub</label>
                  </div>
                  <div className={classes.card_inputContainer__input}>
                    <input
                      id="github"
                      name="github"
                      type="text"
                      defaultValue={dev!.gitHubUrl}
                      ref={devGitHubRef}
                      placeholder="https://github.com/Username"
                    />
                  </div>
                </div>
                <div className={classes.card_inputContainer}>
                  <div className={classes.card_inputContainer__label}>
                    <label htmlFor="linkedin">LinkedIn</label>
                  </div>
                  <div className={classes.card_inputContainer__input}>
                    <input
                      id="linkedin"
                      name="linkedin"
                      type="text"
                      defaultValue={dev!.linkedInUrl}
                      ref={devLinkedInRef}
                      placeholder="https://www.linkedin.com/in/userNameAndId/"
                    />
                  </div>
                </div>
              </Card>
              <Button styles={classes.devPage_button}>Update profile</Button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default DevPage;
