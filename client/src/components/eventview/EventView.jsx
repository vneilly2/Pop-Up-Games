import React from 'react';
import EventDetails from './EventDetails.jsx';
import MessageBoard from './MessageBoard.jsx';
import GuestList from './GuestList.jsx';

var EventView = (props) => (
    <div>
      <h1>Event View</h1>
      <EventDetails />
      <MessageBoard messages={['exampleMessage']}/>
      <GuestList GuestList={['namesOfGuests']}/>
    </div>
  )




export default EventView;