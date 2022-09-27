import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import admin from '../../imagesTech/admin.png';
import analytics from '../../imagesTech/analytics.png';
import architecture from '../../imagesTech/architecture.png';
import C from '../../imagesTech/C.png';
import data from '../../imagesTech/data.png';
import devops from '../../imagesTech/devops.png';
import dotNet from '../../imagesTech/dotNet.png';
import erp from '../../imagesTech/erp.png';
import game from '../../imagesTech/game.png';
import go from '../../imagesTech/go.png';
import html from '../../imagesTech/html.png';
import java from '../../imagesTech/java.png';
import js from '../../imagesTech/js.png';
import mobile from '../../imagesTech/mobile.png';
import other from '../../imagesTech/other.png';
import php from '../../imagesTech/php.png';
import pm from '../../imagesTech/pm.png';
import python from '../../imagesTech/python.png';
import ruby from '../../imagesTech/ruby.png';
import scala from '../../imagesTech/scala.png';
import security from '../../imagesTech/security.png';
import support from '../../imagesTech/support.png';
import testing from '../../imagesTech/testing.png';
import uxui from '../../imagesTech/uxui.png';

const Map: React.FC<{
  width: string;
  height: string;
  latLngArray: { lat: number; lng: number; tech: string }[];
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

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY
  });

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map: any) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded
    ? (
    <GoogleMap
      mapContainerStyle={{ width, height }}
      center={centerObject!}
      zoom={zoomNumber!}
      options={{ disableDefaultUI: true }}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {latLngArray.map((location) => {
        let iconMap;
        switch (location.tech) {
          case 'JS':
            iconMap = js;
            break;
          case 'HTML':
            iconMap = html;
            break;
          case 'PHP':
            iconMap = php;
            break;
          case 'Ruby':
            iconMap = ruby;
            break;
          case 'Python':
            iconMap = python;
            break;
          case 'Java':
            iconMap = java;
            break;
          case '.Net':
            iconMap = dotNet;
            break;
          case 'Scala':
            iconMap = scala;
            break;
          case 'C':
            iconMap = C;
            break;
          case 'Mobile':
            iconMap = mobile;
            break;
          case 'Testing':
            iconMap = testing;
            break;
          case 'DevOps':
            iconMap = devops;
            break;
          case 'Admin':
            iconMap = admin;
            break;
          case 'UX/UI':
            iconMap = uxui;
            break;
          case 'PM':
            iconMap = pm;
            break;
          case 'Game':
            iconMap = game;
            break;
          case 'Analytics':
            iconMap = analytics;
            break;
          case 'Security':
            iconMap = security;
            break;
          case 'Data':
            iconMap = data;
            break;
          case 'Go':
            iconMap = go;
            break;
          case 'Support':
            iconMap = support;
            break;
          case 'ERP':
            iconMap = erp;
            break;
          case 'Architecture':
            iconMap = architecture;
            break;
          case 'Other':
            iconMap = other;
            break;
          case undefined:
            iconMap = other;
            break;
        }
        return (
          <Marker
            icon={iconMap}
            key={location.lat
              .toString()
              .concat(location.lng.toString())
              .concat(Math.random().toString())}
            position={{ lat: location.lat, lng: location.lng }}
          />
        );
      })}
    </GoogleMap>
      )
    : (
    <></>
      );
};

export default Map;
