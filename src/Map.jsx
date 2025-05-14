// Map.jsx
import React, { use, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import RoutingMachine from './RoutingMachine';
import axios from 'axios';


const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [destination, setDestination] = useState({
    lat: -6.340524556872198,
    lng: 107.11309999756057
  });


  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/api/dashboard/order',{
      headers: {
        Authorization: `Bearer 2|8PBZ7APaswPCfOvcDuUEES8SY6UWf2XhtS9CkCej53318b2a`
      }
    })
    .then(response => {
      const responseData = response.data
      .filter(item => item.alamat && item.alamat.latitude && item.alamat.longitude)
          .map(item => ({
            latitude: parseFloat(item.alamat.latitude),
            longitude: parseFloat(item.alamat.longitude),
            label: `Customer ${item.nama_pembeli}<br />${item.alamat.label_alamat} - ${item.alamat.nama_penerima} <br />${item.alamat.detail}`
            // label: "tes "
          }));
          console.log(responseData);
        setMarkers(responseData);
    })
  }, [])


  // const markers = [
  //   {
  //     geocode: [-6.340524556872198, 107.11309999756057],
  //     popUp: "Nasi Kebuli Mutiara"
  //   },
  //   {
  //     geocode: [-6.19675, 107.13989],
  //     popUp: "Dummy 1"
  //   },
  //   {
  //     geocode: [-6.34910, 107],
  //     popUp: "Dummy 2"
  //   }
  // ];

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
          position={[marker.latitude, marker.longitude]}
          icon={customIcon}
          eventHandlers={{
            click: () => {
                setDestination({lat: marker.latitude, lng: marker.longitude });
            }
          }}>
          <Popup><div dangerouslySetInnerHTML={{ __html: marker.label }} /></Popup>
        </Marker>
      ))}
      <RoutingMachine lat={destination.lat} lng={destination.lng} />
    </MapContainer>
  );
};

export default MapComponent;
