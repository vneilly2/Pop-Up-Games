import React from 'react';
import FieldCalendar from './FieldCalendar.jsx';
import FieldInfo from './FieldInfo.jsx';


/**
 * A component to hold the Field Info and Field Calendar components
 */

var Field = (props) => (

  <div className="main field-body">
    <div className='fieldinfo'>
      <FieldInfo />
    </div>
    <div className="fieldcalendar">
      <FieldCalendar />
    </div>
  </div>
  )

export default Field;