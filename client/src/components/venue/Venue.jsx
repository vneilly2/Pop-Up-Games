import React from 'react';
import LoginStatus from '../LoginStatus.jsx';
import NavBar from '../NavBar.jsx';
import VenueBody from './Body.jsx';

var Venue = (props) => (
  <div>
    <LoginStatus />
    <h1>Venue Page</h1>
    <NavBar />
    <VenueBody />
  </div>
  )

export default Venue;