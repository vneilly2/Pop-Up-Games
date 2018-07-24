import React from 'react';
import LoginForm from './LoginForm.jsx';

var Login = (props) => (
  <div>
    <h1>This is the login Form</h1>
    <LoginForm toggleAuth={props.toggleAuth} loggedIn={props.loggedIn} />
  </div>
  )

export default Login;