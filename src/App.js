import logo from './logo.svg';
import './App.css';
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { Icon} from 'leaflet';
import RoutingMachine from './Map';

function App() {
  // click first time
  const ResetZoomOnFirstClick = ({ destination, hasClicked }) => {
    const map = useMap();
  
    useEffect(() => {
      if (hasClicked && destination) {
        map.setView([destination.lat, destination.lng], 15); // Adjust zoom as needed
      }
    }, [hasClicked, destination, map]);
  
    return null;
  };


  // target marker
  const [destination, setDestination] = useState({
    lat: -6.340524556872198,
    lng: 107.11309999756057
  });

  // markers
  const markers = [
    {
      geocode: [-6.340524556872198, 107.11309999756057],
      popUp: "Nasi Kebuli Mutiara"
    },
    {
      geocode : [-6.19675, 107.13989],
      popUp: "Dummy 1"
    },
    {
      geocode : [-6.34910, 107],
      popUp: "Dummy 2"
    }

  ];

  // Icon
  const customIcon = new Icon({
    // iconUrl:"https://img.freepik.com/free-vector/illustration-house-insurance_53876-6157.jpg?t=st=1746538484~exp=1746542084~hmac=f770fc048f883725548a1a225497ac52bb07afa84d46cc80b48b8fb27fdfa28a&w=826",
    iconUrl: require("./img/6157.jpg"),
    iconSize: [38,38]
  })


  return (
    <MapContainer center={[-6.340524556872198, 107.11309999756057]} zoom={13} >
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
          <Popup> 
            {marker.popUp}
          </Popup>
        </Marker>
      ))}
      <RoutingMachine lat={destination.lat} lng={destination.lng} />
    </MapContainer>
  );
}

export default App;
