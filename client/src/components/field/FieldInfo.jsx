import React from 'react';

var FieldInfo = (props) => {
  return(
  <div>
      <h1>Upcoming Events at {props.data.fieldName}</h1>
      <div>Notes: {props.data.notes}</div>
  </div>
  )
}

export default FieldInfo;

