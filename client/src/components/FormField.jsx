import React from 'react';

/**
 * Component used solely for making cleaner forms
 * Each Component starts it's own line and has change and
 * key press methods that should have been pass to it already bound
 */
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