import React, { useCallback, useState } from 'react';
import {
  GoogleMap,
  OverlayView,
  useJsApiLoader
} from '@react-google-maps/api';
import {
  JSTech,
  HTMLTech,
  PHPTech,
  RubyTech,
  PythonTech,
  JavaTech,
  DotNetTech,
  ScalaTech,
  CTech,
  MobileTech,
  TestingTech,
  DevOpsTech,
  AdminTech,
  UXUITech,
  PMTech,
  GameTech,
  AnalyticsTech,
  SecurityTech,
  DataTech,
  GoTech,
  SupportTech,
  ERPTech,
  ArchitectureTech,
  OtherTech
} from '../filters/techField/TechField';

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
            iconMap = <JSTech />;
            break;
          case 'HTML':
            iconMap = HTMLTech();
            break;
          case 'PHP':
            iconMap = PHPTech();
            break;
          case 'Ruby':
            iconMap = RubyTech();
            break;
          case 'Python':
            iconMap = PythonTech();
            break;
          case 'Java':
            iconMap = JavaTech();
            break;
          case '.Net':
            iconMap = DotNetTech();
            break;
          case 'Scala':
            iconMap = ScalaTech();
            break;
          case 'C':
            iconMap = CTech();
            break;
          case 'Mobile':
            iconMap = MobileTech();
            break;
          case 'Testing':
            iconMap = TestingTech();
            break;
          case 'DevOps':
            iconMap = DevOpsTech();
            break;
          case 'Admin':
            iconMap = AdminTech();
            break;
          case 'UX/UI':
            iconMap = UXUITech();
            break;
          case 'PM':
            iconMap = PMTech();
            break;
          case 'Game':
            iconMap = GameTech();
            break;
          case 'Analytics':
            iconMap = AnalyticsTech();
            break;
          case 'Security':
            iconMap = SecurityTech();
            break;
          case 'Data':
            iconMap = DataTech();
            break;
          case 'Go':
            iconMap = GoTech();
            break;
          case 'Support':
            iconMap = SupportTech();
            break;
          case 'ERP':
            iconMap = ERPTech();
            break;
          case 'Architecture':
            iconMap = ArchitectureTech();
            break;
          case 'Other':
            iconMap = OtherTech();
            break;
          case undefined:
            iconMap = OtherTech();
            break;
        }
        return (
          <OverlayView
            key={location.lat
              .toString()
              .concat(location.lng.toString())
              .concat(Math.random().toString())}
            position={{ lat: location.lat, lng: location.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            {iconMap}
          </OverlayView>
        );
      })}
    </GoogleMap>
      )
    : (
    <></>
      );
};

export default Map;
