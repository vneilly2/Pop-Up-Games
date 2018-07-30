import React from 'react';
import PropTypes from 'prop-types';
import CreateFieldForm from './CreateFieldForm.jsx';

/**
 * @description Function Component to hold the create field form
 * expects no props to be passed in
 */
var CreateField = props => (
  <div className="main">
    <CreateFieldForm toggleAuth={props.toggleAuth} changeTarget={props.changeTarget} target={props.target} />
  </div>
);
CreateFieldForm.protoTypes = {
  toggleAuth: PropTypes.func.isRequired,
  venueId: PropTypes.string.isRequired,
};

export default CreateField;
