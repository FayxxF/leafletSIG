// Map.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import RoutingMachine from './RoutingMachine';


const MapComponent = () => {
  const [destination, setDestination] = useState({
    lat: -6.340524556872198,
    lng: 107.11309999756057
  });

  const markers = [
    {
      geocode: [-6.340524556872198, 107.11309999756057],
      popUp: "Nasi Kebuli Mutiara"
    },
    {
      geocode: [-6.19675, 107.13989],
      popUp: "Dummy 1"
    },
    {
      geocode: [-6.34910, 107],
      popUp: "Dummy 2"
    }
  ];

  const customIcon = new Icon({
    iconUrl: require("./img/6157.jpg"),
    iconSize: [38, 38]
  });

  return (
    <MapContainer center={[-6.340524556872198, 107.11309999756057]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.geocode}
          icon={customIcon}
          eventHandlers={{
            click: () => {
              const [lat, lng] = marker.geocode;
              if (destination.lat !== lat || destination.lng !== lng) {
                setDestination({ lat, lng });
              }
            }
          }}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
      <RoutingMachine lat={destination.lat} lng={destination.lng} />
    </MapContainer>
  );
};

export default MapComponent;
