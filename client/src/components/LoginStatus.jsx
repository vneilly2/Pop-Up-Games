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

class LoginStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loggedIn = props.loggedIn;
    this.toggleAuth = props.toggleAuth;
  }

  signout(cb) {
    this.toggleAuth(false);
  }

  render() {
    if(this.loggedIn) {
      return (<span
            onClick={() => {
              this.signout(() => history.push("/"));
            }}
          >
            Sign out
          </span>)
    } else {
      return (
          <HashRouter>
            <div>
              <Link to="/login">Login</Link>
              <Route path="/login" component={Login} />
            </div>
          </HashRouter>
        )
    }
  }
}
export default LoginStatus;