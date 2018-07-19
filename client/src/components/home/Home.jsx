import React from 'react';
import GMap from './Map.jsx';
import VenueList from './VenueList.jsx';

var Home = (props) => (
  <div>
  <h1>Homepage</h1>
  <GMap />
  <VenueList entries={['exampleEntry']}/>
  </div>
  )

export default Home;