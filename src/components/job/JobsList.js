import { Fragment } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";
import JobShort from "./JobShort";

import classes from "./JobsList.module.css";

const DUMMY_JOB_LIST = [
  {
    id: "job1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NBC_logo.svg/2000px-NBC_logo.svg.png",
    jobPosition: "SiiPoland",
    companyName: "SiiPoland",
    minSalary: "5 000",
    maxSalary: "10 000",
    location: "Gdańsk",
    description: {
      aboutUs: "someBS",
      requirements: "requirements",
      companySize: "number",
      expLevel: "text",
      description: "description",
    },
  },
  {
    id: "job2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NBC_logo.svg/2000px-NBC_logo.svg.png",
    jobPosition: "Allegro",
    companyName: "Allegro",
    minSalary: "6 000",
    maxSalary: "9 000",
    location: "Poznań",
    description: {
      aboutUs: "someBS",
      requirements: "requirements",
      companySize: "number",
      expLevel: "text",
      description: "description",
    },
  },
  {
    id: "job3",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NBC_logo.svg/2000px-NBC_logo.svg.png",
    jobPosition: "Mercedes-Benz",
    companyName: "MercedesBenz",
    minSalary: "12 000",
    maxSalary: "16 000",
    location: "Warszawa",
    description: {
      aboutUs: "someBS",
      requirements: "requirements",
      companySize: "number",
      expLevel: "text",
      description: "description",
    },
  },
  {
    id: "job4",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NBC_logo.svg/2000px-NBC_logo.svg.png",
    jobPosition: "Land Rover",
    companyName: "Land Rover",
    minSalary: "13 000",
    maxSalary: "19 000",
    location: "Wrocław",
    description: {
      aboutUs: "someBS",
      requirements: "requirements",
      companySize: "number",
      expLevel: "text",
      description: "description",
    },
  },
];
const JobsList = () => {

  return (
    <Fragment>
      <ul className={classes.job_list}>
        {DUMMY_JOB_LIST.map((job) => (
          <Link to={"jobdescr/" + job.id} key={job.id}>
            <JobShort
              key={job.id}
              id={job.id}
              logo={job.logo}
              jobPosition={job.jobPosition}
              minSalary={job.minSalary}
              maxSalary={job.maxSalary}
              location={job.location}
            />
          </Link>
        ))}
      </ul>
    </Fragment>
  );
};

export default JobsList;
