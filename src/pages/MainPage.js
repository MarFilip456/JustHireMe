import Filters from "../components/Filters";
import SwitchTabs from "../components/SwitchTabs";
import JobsList from "../components/job/JobsList";
import classes from "./MainPage.module.css";

const MainPage = () => {
  
  return (
    <div className={classes.mainPage}>
      <Filters />
      <SwitchTabs />
      <JobsList />
    </div>
  );
};

export default MainPage;
