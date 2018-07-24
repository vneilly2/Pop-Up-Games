import React from 'react';
import ReactDOM from 'react-dom';

import Logout from './components/logout/Logout.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import LoginStatus from './components/LoginStatus.jsx';
import NavBar from './components/NavBar.jsx';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    };
  }
  logOut() {
    this.setState({loggedIn: false});
  }
  toggleLogin(state) {
    this.setState({loggedIn: state});
  }

  render() {
      return (
        <div>
          <HashRouter>
            <div>
              <Link to="/signup" style={this.state.loggedIn ? {display:'none'} : {} }>Signup Form</Link>
              <Link to="/login" style={this.state.loggedIn ? {display:'none'} : {} }>Login Form</Link>
              <Link to="/logout" style={this.state.loggedIn ? {} : {display:'none'} }>Logout</Link>
              <Route path="/signup"
              render={props => <Signup />} />
              <Route path="/logout"
              render={props => <Logout
                toggleAuth={this.toggleLogin.bind(this)} {...props} />} />
              <Route path="/login"
              render={props => <Login
                loggedIn={this.state.loggedIn}
                toggleAuth={this.toggleLogin.bind(this)} {...props} />} />
            </div>
          </HashRouter>
          <div style={this.state.loggedIn ? {} : {display:'none'} } >
            <NavBar/>
          </div>
        </div>
        )
  }

}

ReactDOM.render(<App />, document.getElementById('app'));