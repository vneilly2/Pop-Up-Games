import React from 'react';
import VenueEntry from './VenueEntry.jsx';

var VenueEntryList = (props) => (
  <div className="tonetwo venuelist">
    <h3 className="w3-center">Venues Near You</h3>
  <ul>
    {
      props.venues.map((venue, index) => {
        return (<VenueEntry 
        venue={venue} 
        changeTarget={props.changeTarget}
        key={index} />)
      })
    }
  </ul>
  </div>
  )


export default VenueEntryList;