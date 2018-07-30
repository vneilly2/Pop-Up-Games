import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Component for making cleaner form inputs.
 * Each line ends with a <br/> and has change and
 * key press methods that should have been passed to in bound to parent component
 * @param txtId the placeholder text for input field
 * @param fieldName name for the input tag, should correspond to state in parent component
 * @param [isPassword] bool indicating whether input is pasword field, defaults to false
 * @param updateState function triggered by onChange
 * @param handleEnter function triggered by onKeyPress
 */
var FormField = props => {
  return (
    <div>
      <input
        className={props.className}
        placeholder={props.txtId}
        name={props.fieldName}
        type={props.isPassword ? 'password' : 'text'}
        onChange={props.updateState}
        onKeyPress={props.handleEnter}
      />
      <br />
    </div>
  );
};
FormField.propTypes = {
  txtId: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  isPassword: PropTypes.bool,
  updateState: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  className: PropTypes.string,
};
FormField.defaultProps = {
  isPassword: false,
  className: '',
};
export default FormField;
