import React from 'react';
import FieldCalendar from './FieldCalendar.jsx';
import FieldInfo from './FieldInfo.jsx';

var Field = (props) => (

  <div className="main">
    <h1>Field Page</h1>
    <FieldInfo />
    <FieldCalendar />
  </div>
  )

export default Field;