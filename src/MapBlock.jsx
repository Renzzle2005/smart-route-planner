import { GoogleMap, Marker, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useEffect } from 'react';


function MapBlock({ origin, destination }) {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyBi9cUKamyHx7NRTV26lKJ5mgJpbTQxY_Q",
    });
  
    const [directions, setDirections] = useState(null);
  
    useEffect(() => {
      if (origin && destination && window.google) {
        const directionsService = new window.google.maps.DirectionsService();
  
        directionsService.route(
          {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              console.error("Error fetching directions", result);
            }
          }
        );
      }
    }, [origin, destination]);
  
    if (!isLoaded) return <div>Loading map...</div>;
  
    return (
      <div>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={{ lat: 34.2257, lng: -77.9447 }}
          zoom={10}
        >
          {directions && (
            <DirectionsRenderer options={{ directions }} />
          )}
          <Marker position={{ lat: 34.2257, lng: -77.9447 }} />
        </GoogleMap>
      </div>
    );
  }
export default MapBlock;
