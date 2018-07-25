import React from 'react';

var VenueEntry = (props) => (
  <li>
    <div className="venuelistentry toneone">
      <span>Name:</span><span>placeholder</span><br/>
      <span>Address:</span><span>{props.venue.notes}</span>
    </div>
  </li>
  )


export default VenueEntry;