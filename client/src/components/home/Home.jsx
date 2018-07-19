import React from 'react';
import LoginStatus from '../LoginStatus.jsx';
import NavBar from '../NavBar.jsx';
import GMap from './Map.jsx';
import VenueList from './VenueList.jsx';

var Home = (props) => (
  <div>
  <LoginStatus />
    <h1>Homepage</h1>
  <NavBar />
  <Gmap />
  <VenueList />
  </div>
  )

export default Home;