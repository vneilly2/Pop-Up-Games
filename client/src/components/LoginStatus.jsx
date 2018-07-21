import React from 'react';
import Login from './login/Login.jsx'
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

var LoginStatus = (props) => {
  if(props.loggedIn) {
    return (<div>Logged In</div>)
  } else {
    return (
        <HashRouter>
          <div>
            <Link to="/login">Login</Link>
            <Route
              path='/login'
              render={(props) =>
              <Link {...props} onUpdate={props.onUpdate} />}
            />
          </div>
        </HashRouter>
      )
  }
}
export default LoginStatus;