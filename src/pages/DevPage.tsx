import React, { Fragment } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";

const DevPage = () => {
  const profileUpdateHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <div>
        <p>My profile</p>
        <form onSubmit={profileUpdateHandler}>
          <Card>
            <h1>USER DETAILS</h1>
            <div>
              <img alt="user_image" />
            </div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" name="surname" />
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" />
            <label htmlFor="aboutYou">Introduce yourself</label>
            <textarea />
          </Card>
          <Card>
            <h1>YEARS OF EXPERIENCE</h1>
            <p>How many years of experience do you have?</p>
            <label htmlFor="0-1">0-1 years</label>
            <input type="radio" id="0-1" name="0-1" />
            <label htmlFor="1-2">1-2 years</label>
            <input type="radio" id="1-2" name="1-2" />
            <label htmlFor="2-4">2-4 years</label>
            <input type="radio" id="2-4" name="2-4" />
            <label htmlFor="4-6">4-6 years</label>
            <input type="radio" id="4-6" name="4-6" />
            <label htmlFor="6-10">6-10 years</label>
            <input type="radio" id="6-10" name="6-10" />
            <label htmlFor="10+">10+ years</label>
            <input type="radio" id="10+" name="10+" />
          </Card>
          <Card>
            <h1>SOCIAL LINKS</h1>
            <label htmlFor="github">GitHub</label>
            <input id="github" name="github" type="text" />
            <label htmlFor="linkedin">LinkedIn</label>
            <input id="linkedin" name="linkedin" type="text" />
          </Card>
          <Button>Update profile</Button>
        </form>
      </div>
    </Fragment>
  );
};

export default DevPage;
