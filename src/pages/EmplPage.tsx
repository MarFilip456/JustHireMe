import { Fragment } from "react";
import JobsList from "../components/job/JobsList";

const EmplPage = () => {
    return <Fragment>
        <h1>Your list of uploaded offers.</h1>
        <JobsList />
    </Fragment>
}
export default EmplPage;