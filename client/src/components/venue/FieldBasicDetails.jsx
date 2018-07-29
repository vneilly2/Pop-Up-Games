import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description renders the basics deatails of the field
 * @param { String } props.fieldName the name of the field
 * @param { String } props.notes notes about the field
 */
var FieldBasicDetails = (props) => (
  <div>
    <h3>{props.data.fieldName}</h3>
    Notes: {props.data.notes}
  </div>)

FieldBasicDetails.propTypes = {
  data: PropTypes.object.isRequired,
}

export default FieldBasicDetails;