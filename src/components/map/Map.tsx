import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map: React.FC<{
  width: string;
  height: string;
  lat: number;
  lng: number;
}> = (props) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: props.width, height: props.height }}
        center={{ lat: props.lat, lng: props.lng }}
        zoom={13}
      >
        <Marker position={{ lat: props.lat, lng: props.lng }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
