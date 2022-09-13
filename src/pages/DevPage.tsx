import React, { Fragment, useRef, useEffect } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import userIcon from '../images/userIcon.png';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useAppDispatch } from '../store/redux-hooks';
import { uiActions } from '../store/ui-slice';

import useSingleUser from '../hooks/use-singleUser';
import axios from 'axios';

const DevPage = () => {
  const dispatch = useAppDispatch();
  const devId = localStorage.getItem('justHireMeId');
  const { data, isLoading, isError } = useSingleUser(devId!);

  useEffect(() => {
    if (isError) {
      dispatch(uiActions.changeInformationPopup());
      dispatch(uiActions.showInforamtion('Could not fetch user data!'));
    }
  }, [isError]);
  const dev = data!;
  const token = localStorage.getItem('justHireMeToken');
  const finishedLoading: boolean = !isLoading && dev !== null;

  const mainLangArray = [
    'JS',
    'HTML',
    'PHP',
    'Ruby',
    'Python',
    'Java',
    '.Net',
    'Scala',
    'C',
    'Mobile',
    'Testing',
    'DevOps',
    'Admin',
    'UX/UI',
    'PM',
    'Game',
    'Analytics',
    'Security',
    'Data',
    'Go',
    'Support',
    'ERP',
    'Architecture',
    'Other'
  ];
  const experienceArray = ['0-1', '1-2', '2-4', '4-6', '6-10', '10+'];

  const profileUpdateHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateObject = {
      name: devNameRef.current?.value!,
      surname: devSurnameRef.current?.value!,
      logoUrl: devLogoRef.current?.value!,
      experience: devExperienceRef.current?.value!,
      mainLang: devMainLangRef.current?.value!,
      location: devLocationRef.current?.value!,
      aboutYou: devAboutYouRef.current?.value!,
      gitHubUrl: devGitHubRef.current?.value!,
      linkedInUrl: devLinkedInRef.current?.value!
    };
    const url = process.env.REACT_APP_API_ADRESS;
    axios
      .patch(url!.concat(`/auth/${dev.id}`), updateObject, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(uiActions.showInforamtion('Profile updated!'))
          dispatch(uiActions.changeInformationPopup());
          /* dispatch(uiActions.changeInformationPopup());
          dispatch(uiActions.showInforamtion('Profile updated')); */
        }
      })
      .catch((error) => {
        dispatch(uiActions.showInforamtion(`Error occured: ${error.message}`))
        dispatch(uiActions.setInformationError());
        dispatch(uiActions.changeInformationPopup());
        /* dispatch(uiActions.changeInformationPopup());
        dispatch(
          uiActions.showInforamtion(
            `Check if given email is valid: ${error.message}`
          )
        ); */
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
                  src={dev.logoUrl ? dev.logoUrl : userIcon}
                />
                <label htmlFor="logoUrl">Logo url</label>
                <input
                  type="text"
                  id="logoUrl"
                  name="logoUrl"
                  defaultValue={dev.logoUrl}
                  ref={devLogoRef}
                />
              </div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={dev.name}
                ref={devNameRef}
              />
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                id="surname"
                name="surname"
                defaultValue={dev.surname}
                ref={devSurnameRef}
              />
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={dev.email}
                readOnly
              />
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={dev.location}
                ref={devLocationRef}
              />
              <label htmlFor="aboutYou">Introduce yourself</label>
              <textarea
                defaultValue={dev.aboutYou}
                maxLength={50}
                ref={devAboutYouRef}
              />
            </Card>
            <Card>
              <h1>EXPERIENCE</h1>
              <p>Select your main language</p>
              <select
                name="languages"
                id="languages"
                defaultValue={dev.mainLang}
                ref={devMainLangRef}
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
              <select
                name="exp"
                id="exp"
                defaultValue={dev.experience}
                ref={devExperienceRef}
              >
                {experienceArray.map((exp) => (
                  <option key={experienceArray.indexOf(exp)} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </Card>
            <Card>
              <h1>SOCIAL LINKS</h1>
              <label htmlFor="github">GitHub</label>
              <input
                id="github"
                name="github"
                type="text"
                defaultValue={dev.gitHubUrl}
                ref={devGitHubRef}
              />
              <label htmlFor="linkedin">LinkedIn</label>
              <input
                id="linkedin"
                name="linkedin"
                type="text"
                defaultValue={dev.linkedInUrl}
                ref={devLinkedInRef}
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
