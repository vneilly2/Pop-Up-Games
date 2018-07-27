import React from 'react';
import VenueBody from './Body.jsx';

var Venue = (props) => (
  <div className="main">
    <div>
      <VenueBody target={props.target} changeTarget={props.changeTarget}/>
    </div>
  </div>
  )

export default Venue;