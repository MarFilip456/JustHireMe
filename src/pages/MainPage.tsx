import { Link } from "react-router-dom";

import Filters from "../components/filters/Filters";
import SwitchTabs from "../components/filters/SwitchTabs";
import JobsList from "../components/job/JobsList";
import classes from "./MainPage.module.css";
import Button from "../UI/Button";

const MainPage = () => {
  return (
    <div className={classes.mainPage}>
      <Filters />
      <SwitchTabs />
      <JobsList />
      <div className={classes.bottomMap}>
        <Link to="/map">
          <Button styles={classes.bottomMap__button}>
            <img
              className={classes.bottomMap__button_img}
              alt="map_image"
              src="https://thumbs.dreamstime.com/b/white-earth-globe-isolated-black-background-illustration-white-earth-globe-isolated-black-background-166294648.jpg"
            />
            <p className={classes.bottomMap__button_p}>Map</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
