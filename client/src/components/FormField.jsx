import React from 'react';

/**
 * @description Component used solely for making cleaner forms
 * Each Component starts it's own line and has change and
 * key press methods that should have been pass to it already bound
 * @params { Object.<string, any> } props props to be passed in.
 * @params { string } props.txtId The text to go in the placeholder of the input
 * @params { string } props.fieldName assigns the name of the input field. 
 * For optimal use parent component should have a state with this name
 * @params { boolean } [props.isPassword] indicates whether the input is a password
 * @params { function } props.updateState function executed when contents of input field are updated
 * @params { function } props.handleEnter function excecuted when key is released inside input field
 */
var FormField = (props) => {

  return (<div>
      <input
        placeholder={props.txtId}
        type={props.isPassword ? 'password' : 'text'}
        name={props.fieldName}
        onChange={props.updateState}
        onKeyPress={props.handleEnter}
      />
    <br/>
  </div>)
};

export default FormField;