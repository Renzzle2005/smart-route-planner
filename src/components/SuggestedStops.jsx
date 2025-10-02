import React from 'react';

function SuggestedStops({ stops }) {
  return (
    <div>
      <h3>Suggested Stops:</h3>
      <ul>
        {stops.map((stop, index) => (
          <li key={index}>{stop.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestedStops;
    
