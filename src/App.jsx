import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MapView from './MapView';
import MapBlock from './MapBlock';
import SuggestedStops from './components/SuggestedStops';


function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestedStops, setSuggestedStops] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origin || !destination) {
      alert("Please enter both origin and destination.");
      return;
    }
    fetchSuggestedStops();
  };

  const fetchSuggestedStops = async () => {
    if (!origin || !destination) return;
  
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=scenic+attractions+along+route&key=YOUR_API_KEY`
      );
      const data = await response.json();
      setSuggestedStops(data.results || []);
    } catch (error) {
      console.error("Failed to fetch suggested stops:", error);
    }
  };
      useEffect(() => {
        if (origin && destination) {
          fetchSuggestedStops();
        }
      }, [origin, destination]);

  const handleToggleStop = (stop) => {
    const isSelected = selectedStops.find((s) => s.place_id === stop.place_id);
    if (isSelected) {
      setSelectedStops((prev) => prev.filter((s) => s.place_id !== stop.place_id));
    } else {
      setSelectedStops((prev) => [...prev, stop]);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Start location"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      <input
          type="text"
          placeholder="End location"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </form>

      <SuggestedStops
        stops={suggestedStops}
        selectedStops={selectedStops}
        onToggleStop={handleToggleStop}
      />

      {origin && destination && (
        <MapBlock
          origin={origin}
          destination={destination}
          waypoints={selectedStops.map((stop) => ({
            location: stop.geometry.location,
            stopover: true,
          }))}
        />
      )}
    </div>
  );
}

export default App;
