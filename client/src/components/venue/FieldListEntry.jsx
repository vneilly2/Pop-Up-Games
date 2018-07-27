import React from 'react';
import FieldBasicDetails from './FieldBasicDetails.jsx';
import FieldDayCalendar from './FieldDayCalendar.jsx';

var FieldListEntry = (props) => (
  <li>
    <FieldBasicDetails />
    <FieldDayCalendar />
  </li>
  )

export default FieldListEntry;