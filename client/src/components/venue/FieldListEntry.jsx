import React from 'react';
import FieldBasicDetails from './FieldBasicDetails.jsx';
import FieldDayCalendar from './FieldDayCalendar.jsx';

var FieldListEntry = (props) => (
  <div className="indivfield">
    <FieldBasicDetails className="field-basic-details"/>
    <FieldDayCalendar className="field-todays-events" todaysEvents={['Soccer 9AM-11AM','Soccer 3:00PM-5:00PM', 'Quidditch 6:30PM-7:30PM']}/>
  </div>
  )

export default FieldListEntry;