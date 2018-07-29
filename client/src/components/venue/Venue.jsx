import React from 'react';
import VenueBody from './Body.jsx';
import PropTypes from 'prop-types';

/**
 * @description component that holds all the information about the venue
 * @param { Object } props.target object with keys indicating the current relevant targets
 * @param { Function } props.changeTarget function that can alter the target of the parent app, must be bound to app
 */

var Venue = (props) => (
  <div className="main">
    <div>
      <VenueBody target={props.target} changeTarget={props.changeTarget}/>
    </div>
  </div>
  )

Venue.propTypes = {
  target: PropTypes.object.isRequired,
  changeTarget: PropTypes.func.isRequired,
}

export default Venue;