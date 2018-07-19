import React from 'react';
import LoginStatus from '../LoginStatus.jsx';
import NavBar from '../NavBar.jsx';
import EventDetails from './EventDetails.jsx';
import MessageBoard from './MessageBoard.jsx';
import GuestList from './GuestList.jsx';

var EventView = (props) => (
    <div>
      <LoginStatus />
      <h1>Event View</h1>
      <NavBar />
      <EventDetails />
      <MessageBoard />
      <GuestList />
    </div>
  )




export default EventView;