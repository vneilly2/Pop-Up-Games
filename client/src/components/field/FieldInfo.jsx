import React from 'react';

var FieldInfo = (props) => {
  return(
  <div>
      <h1>{props.data.fieldName}</h1>
      <div>{props.data.notes}</div>

  </div>
  )
}

export default FieldInfo;

