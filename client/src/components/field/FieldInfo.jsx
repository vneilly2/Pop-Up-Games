import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description displays the info about the field
 * @param props.data.fieldName the name of the field
 * @param props.data.notes the notes on the field
 */
var FieldInfo = (props) => {
  return(
  <div>
      <h1>Upcoming Events at {props.data.fieldName}</h1>
      <div>Notes: {props.data.notes}</div>
  </div>
  )
}

FieldInfo.propTypes = {
    data: PropTypes.object.isRequired,
}

export default FieldInfo;

