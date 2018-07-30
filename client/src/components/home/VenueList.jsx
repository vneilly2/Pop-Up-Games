import React from 'react';
import VenueEntry from './VenueEntry.jsx';
import PropTypes from 'prop-types';

/**
 * @description A component that renders all the info for a venue
 */
var VenueEntryList = props => (
  <div className="tonetwo venuelist">
    <h3 className="center">Venues Near You</h3>
    <ul>
      {props.venues.map((venue, index) => {
        return <VenueEntry venue={venue} changeTarget={props.changeTarget} key={index} />;
      })}
    </ul>
  </div>
);
VenueEntryList.propTypes = {
  venues: PropTypes.array.isRequired,
};

export default VenueEntryList;
