import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm.jsx';

/**
 * @description Function Componenet used to hold the Login Form Componenet
 */
var Login = props => (
  <div className="main">
    <div>
      <LoginForm toggleAuth={props.toggleAuth} />
    </div>
  </div>
);
Login.propTypes = {
  toggleAuth: PropTypes.func.isRequired,
};
export default Login;
