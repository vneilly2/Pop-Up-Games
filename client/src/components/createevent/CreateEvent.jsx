import React from 'react';
import LoginStatus from '../LoginStatus.jsx';
import NavBar from '../NavBar.jsx';
import CreateEventForm from './CreateEventForm.jsx';

var CreateEvent = (props) => (
  <div>
    <LoginStatus />
    <h1>This is the create event page</h1>
    <NavBar />
    <CreateEventForm />
  </div>
  )

export default CreateEvent;