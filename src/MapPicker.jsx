import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const coords = e.latlng;
      setPosition(coords);
      onLocationSelect(coords); // Send to parent
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const MapPicker = () => {
  const handleLocationSelect = async (coords) => {
    console.log('Selected coordinates:', coords);

    try {
      await fetch('http://localhost:5000/api/save-coordinates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coords),
      });
      alert('Coordinates sent to backend!');
    } catch (err) {
      console.error(err);
      alert('Failed to send coordinates');
    }
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onLocationSelect={handleLocationSelect} />
    </MapContainer>
  );
};

export default MapPicker;
