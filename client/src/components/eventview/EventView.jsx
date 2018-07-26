import React from 'react';
import EventDetails from './EventDetails.jsx';
import MessageBoard from './MessageBoard.jsx';
import GuestList from './GuestList.jsx';

var EventView = (props) => (
    <div className="main event-view-body">
      <div className="eventinfo">
        <EventDetails />
      </div>
        <div className=" messageboard">
          <MessageBoard messages={['exampleMessage']}/>
        </div>
        <div className="guestlist">
          <GuestList  GuestList={['namesOfGuests']}/>
        </div>
      
    </div>
  )




export default EventView;