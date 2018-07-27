import React from 'react';

var VenueEntry = (props) => (
  <li>
    <div className="venuelistentry toneone" onClick={() => props.changeTarget( { type: 'venue', id: props.venue.id })} >
      <span>Name:</span><span>{props.venue.venueName}</span><br/><br/>
      <span>Address:</span><span>{props.venue.address}</span><br/><br/>
    </div>
  </li>
  )


export default VenueEntry;