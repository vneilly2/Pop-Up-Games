import React from 'react';
import FieldDayCalendarEntry from './FieldDayCalendarEntry.jsx';

var FieldDayCalendar = (props) => (
  <div>
    <div>Today's Events:</div>
    {
      props.todaysEvents.map((event, index) => {
        return ( <FieldDayCalendarEntry key={index}/> )
      })
    }
  </div>
  )

export default FieldDayCalendar;