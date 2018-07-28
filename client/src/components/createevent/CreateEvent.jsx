import React from 'react';
import CreateEventForm from './CreateEventForm.jsx';

/**
 * A component to hold the Create Event Form Component
 */

var CreateEvent = (props) => (
  <div className="main">
    <h1>This is the create event page</h1>
    <CreateEventForm toggleAuth={props.toggleAuth} target={props.target} />
  </div>
)

export default CreateEvent;