import React from 'react';
import FieldBasicDeatails from './FieldBasicDetails.jsx';
import FieldDayCalendar from './FieldDayCalendar.jsx';

var FieldListEntry = (props) => (
  <li>
    <FieldBasicDeatails />
    <FieldDayCalendar />
  </li>
  )

export default FieldListEntry;