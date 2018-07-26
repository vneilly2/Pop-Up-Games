import React from 'react';
import GMap from './GMap.jsx';
import VenueList from './VenueList.jsx';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position : { lat: -34.397, lng: 150.644 },
      nearbyVenues : [
      {
        position : { lat: -34.197, lng: 150.644 },
        notes : 'This is a wonderful venue'
      },
      {
        position : { lat: -34.297, lng: 150.744 },
        notes : 'So is this Venue'
      },
      {
        position : { lat: -34.497, lng: 150.544 },
        notes : 'This is also a great place'
      },
      {
        position : { lat: -34.197, lng: 150.844 },
        notes : 'I really want to go here'
      },
      {
        position : { lat: -34.197, lng: 150.444 },
        notes : 'This is the best of all of them'
      }
      ]
    };
  }

  componentWillMount() {
    axios.get('/venues')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }



  render() {
    if(this.state.position === undefined) {
      return (
      <div>
        <h1>Homepage</h1>
        <h2>Loading</h2>
      </div>
      )
    } else {
      return (
      <div className="row">
        <div className="venuemap" >
          <GMap position={this.state.position} venues={this.state.nearbyVenues} />
        </div>
        <div><div className="venuecolumn"><VenueList venues={this.state.nearbyVenues}/></div></div>
      </div>
      )
    }
  }
}
export default Home;

