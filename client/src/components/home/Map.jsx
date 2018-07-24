import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { GMAPS_API } from '../../../../config/config.js';

export class GMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      nearbyVenues: this.props.venues,
      position: this.props.position
    };
  }


  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    return (
      <Map google={this.props.google}
          onClick={this.onMapClicked.bind(this)}
          style={{width: '70%', height: '70%', position: 'relative'}}
          initialCenter={{
            lat: this.state.position.lat,
            lng: this.state.position.lng
        }}>
        <Marker onClick={this.onMarkerClick.bind(this)}
                name={'User Home'}
                icon={{
                  url: 'img/home.png',
                  scaledSize: new google.maps.Size(20, 30)
                  }}
                />
        {
          this.state.nearbyVenues.map((venue, index) => {
            return (
                <Marker
                  position = {venue.position}
                  onClick={this.onMarkerClick.bind(this)}
                  name={venue.notes}
                  key={index}
                  icon={{
                    url: 'img/pin.png',
                    scaledSize: new google.maps.Size(30, 30)
                  }}
                  />
              )
          })

        }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <p>{this.state.selectedPlace.name}</p>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (GMAPS_API)
})(GMap)