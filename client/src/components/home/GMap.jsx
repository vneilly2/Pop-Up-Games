import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class GMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      nearbyVenues: this.props.venues,
      position: this.props.position,
    };
  }
  /**
   * @description This runs to make sure when you reload the map
   * that all the markers will appear
   */
  componentWillReceiveProps(props) {
    this.setState({ nearbyVenues: props.venues });
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  render() {
    return (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked.bind(this)}
        style={{ width: '100%', height: '100%' }}
        zoom={12}
        initialCenter={{
          lat: this.state.position.lat,
          lng: this.state.position.lng,
        }}
      >
        <Marker
          onClick={this.onMarkerClick.bind(this)}
          name={this.state.position.address}
          icon={{
            url: 'img/home.png',
            scaledSize: new google.maps.Size(20, 30),
          }}
        />
        {this.state.nearbyVenues.map((venue, index) => {
          return (
            <Marker
              position={{ lat: venue.lat, lng: venue.lng }}
              onClick={this.onMarkerClick.bind(this)}
              name={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={'https://www.google.com/maps/dir/'
                    .concat(this.state.position.address.replace(' ', '+'))
                    .concat('/')
                    .concat(venue.address.replace(' ', '+'))}
                >
                  {venue.venueName}
                </a>
              }
              key={index}
              icon={{
                url: 'img/pin.png',
                scaledSize: new google.maps.Size(30, 30),
              }}
            />
          );
        })}
        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
          <div>
            <p>{this.state.selectedPlace.name}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey:
    process.env.NODE_ENV === 'production' ? process.env.GMAPS_API : require('../../../../config/config.js').API,
})(GMap);
