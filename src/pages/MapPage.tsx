import { Fragment } from "react";
import Map from "../components/map/Map";
import Filters from "../components/Filters";

const MapPage = () => {
  return (
    <Fragment>
      <Filters />
      <Map />
    </Fragment>
  );
};

export default MapPage;
