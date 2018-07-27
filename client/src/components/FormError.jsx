import React from 'react';
import PropTypes from 'prop-types'
/**
 * @description Component used solely for making cleaner forms
 * Each Component design to only render passed in message
 * when the check condition passed is is true.
 * If not true doesn't render anything to DOM
 * @param check if true renders message in red otherwise renders nothing
 * @param message message string to render
 */
var FormError = (props) => (
  <div style={props.check ? {color: 'red'} : {display:'none'}}>
    <a>
      {props.message}
    </a><br/>
  </div>
);

FormError.propTypes = {
  check: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

export default FormError;