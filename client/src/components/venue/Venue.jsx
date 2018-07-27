import React from 'react';
import VenueBody from './Body.jsx';

var Venue = (props) => (
  <div className="main venue-body">
    <div className="venue-name">
      Brooklyn Bridge Park
    </div>
    <div className="venueinfo">
      <VenueBody />
    </div>
  </div>
  )

export default Venue;