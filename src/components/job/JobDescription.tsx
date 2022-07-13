import { Fragment } from "react";
import { offerObject } from "../../store/offers-slice";

const JobDescription:React.FC<{job: offerObject}> = (props) => {
// time to use some tools to visualize what the page should look like
// check sisters materials
// decide what the offer object should look like
    return <Fragment>
        <p>{props.job.companyName}</p>
        <p>{props.job.jobPosition}</p>
        <p>{props.job.location}</p>
        <p>{props.job.minSalary}</p>
        <p>{props.job.maxSalary}</p>
        <img alt="company_logo" src={props.job.logo} width="100px" />
    </Fragment>
}

export default JobDescription;