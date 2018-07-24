import React from 'react';
import ReactDOM from 'react-dom';
import Logout from './components/logout/Logout.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import NavBar from './components/NavBar.jsx';

import {
  HashRouter,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    };
  }
  /**
   * toggles the state of loggedIn to the
   * value of the boolean it is passed
   * should be bound to App before being passed on
   *
   * input: true || false
   * output: none
   */
  toggleLogin(state) {
    this.setState({loggedIn: state});
  }

  /**
   * renders the body of the App
   * contains conditionally rendered components when not logged in:
   * Sign up && Login
   * As well as a navigation bar as a hash router for all
   * feature supporting components
   *
   * and when logged in:
   * Logout
   */
  render() {
      return (
        <div>
          <HashRouter>
            <div>
              <Link to="/signup" style={this.state.loggedIn ? {display:'none'} : {} }>Signup Form</Link>
              <Link to="/login" style={this.state.loggedIn ? {display:'none'} : {} }>Login Form</Link>
              <Link to="/logout" style={this.state.loggedIn ? {} : {display:'none'} }>Logout</Link>
              <Route path="/signup" render={props =>
                <Signup />}
              />
              <Route path="/logout" render={props =>
                <Logout toggleAuth={this.toggleLogin.bind(this)} {...props} />} />
              <Route path="/login" render={props =>
                <Login loggedIn={this.state.loggedIn} toggleAuth={this.toggleLogin.bind(this)} {...props} />}
              />
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