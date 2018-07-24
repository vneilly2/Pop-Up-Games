import React from 'react';

/**
 * Component used solely for making cleaner forms
 * Each Component design to only render passed in message
 * when the check condition passed is is true.
 * If not true doesn't render anything to DOM
 */
var FormError = (props) => (
  <div style={props.check ? {color: 'red'} : {display:'none'}}>
    <a>
      {props.message}
    </a><br/>
  </div>
);

export default FormError;