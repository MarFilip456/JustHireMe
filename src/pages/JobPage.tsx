import { Fragment } from "react";
import { useParams } from "react-router-dom";

import JobCard from "../components/job/JobCard";

const JobPage = () => {
  const params = useParams<{ jobId: string }>();

  return (
    <Fragment>
      <JobCard id={params.jobId!} />
    </Fragment>
  );
};

export default JobPage;
