import React from 'react';

var FormField = (props) => (
  <div>
    <a>{props.txtId + ':'}</a>
      <input
        type={props.isPassword ? 'password' : 'text'}
        name={props.fieldName}
        onChange={(event) => props.updateState(event)}
        onKeyPress={(event) => props.handleEnter(event)}
      />
    <br/>
  </div>
);

export default FormField;