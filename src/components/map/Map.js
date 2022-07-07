import { GoogleMap, LoadScript } from "@react-google-maps/api";

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100vw", height: "80vh" }}
        center={{ lat: 53.90391, lng: 17.06356 }}
        zoom={15}
      ></GoogleMap>
    </LoadScript>
  );
};

export default Map;
