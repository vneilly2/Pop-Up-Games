import React from 'react';
import LoginForm from './LoginForm.jsx';

/**
 * Function Componenet used to hold the Login Form Componenet
 */
var Login = (props) => (
  <div className="main">
    <div>
      <LoginForm toggleAuth={props.toggleAuth} loggedIn={props.loggedIn} />
    </div>
  </div>
  )

export default Login;