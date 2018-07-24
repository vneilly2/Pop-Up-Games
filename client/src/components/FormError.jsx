import React from 'react';

var FormError = (props) => (
  <div style={props.check ? {color: 'red'} : {display:'none'}}>
    <a>
      {props.message}
    </a><br/>
  </div>
);

export default FormError;