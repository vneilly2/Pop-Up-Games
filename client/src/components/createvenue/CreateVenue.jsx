import React from 'react';
import CreateVenueForm from './CreateVenueForm.jsx';

/**
 * Functional Component to hold the Create Venue Form
 * Component.
 * 
 */
var CreateVenue = (props) => (
  <div className="main">
    <CreateVenueForm toggleAuth={props.toggleAuth} />
  </div>
  )

export default CreateVenue;