import React from 'react';
import PropTypes from 'prop-types';

var VenueInfo = (props) => (
  <div>
    {props.venueinfo}
  </div>)

VenueInfo.propTypes = {
  venueinfo: PropTypes.string.isRequired,
}

export default VenueInfo;