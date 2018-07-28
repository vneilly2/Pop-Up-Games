import React from 'react';
import FieldDayCalendarEntry from './FieldDayCalendarEntry.jsx';

var FieldDayCalendar = (props) => (
  <div>
    <div>Today's Events:</div>
    {
      props.events.map((event, index) => {
        return ( <FieldDayCalendarEntry event={event} key={index}/> )
      })
    }
  </div>
  )

export default FieldDayCalendar;