import { useParams } from "react-router-dom";

import JobCard from "../components/job/JobCard";

const JobPage = () => {
  const params = useParams();

  return (
    <div>
      <JobCard />
      <p>{params.jobId}</p>
    </div>
  );
};

export default JobPage;
