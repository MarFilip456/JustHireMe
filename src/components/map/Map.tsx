import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map: React.FC<{
  width: string;
  height: string;
  latLngArray: {lat: number, lng: number}[]
  single: boolean;
  styles?: React.CSSProperties;
}> = (props) => {
  const { width, height, latLngArray, single } = props;
  let centerObject: { lat: number; lng: number };
  let zoomNumber: number;

  if (single) {
    centerObject = latLngArray[0];
    zoomNumber = 13;
  }
  if (!single) {
    centerObject = { lat: 51.9189, lng: 19.1343 };
    zoomNumber = 6;
  }
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY}>
      <GoogleMap
        mapContainerStyle={{ width, height }}
        center={centerObject!}
        zoom={zoomNumber!}
        mapTypeId='terrain'
        options={ { disableDefaultUI: true } }
      >
        {latLngArray.map((location) => {
          return <Marker key={location.lat.toString().concat(location.lng.toString())} position={{ lat: location.lat, lng: location.lng }} />
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
