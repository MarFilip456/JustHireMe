import { Fragment } from "react";
import Map from "../components/map/Map";
import Filters from "../components/filters/Filters";

const MapPage = () => {
  return (
    <Fragment>
      <Filters />
      <Map width="100vw" height="600px" lat={53.9044739} lng={17.0664112} />
    </Fragment>
  );
};

export default MapPage;
