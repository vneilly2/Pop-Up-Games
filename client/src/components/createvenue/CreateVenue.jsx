import React from 'react';
import CreateVenueForm from './CreateVenueForm.jsx';
import PropTypes from 'prop-types';

/**
 * Functional Component to hold the Create Venue Form
 * Component.
 *
 */
var CreateVenue = props => (
  <div className="main">
    <CreateVenueForm toggleAuth={props.toggleAuth} />
  </div>
);

CreateVenue.propTypes = {
  toggleAuth: PropTypes.func.isRequired,
};

export default CreateVenue;
