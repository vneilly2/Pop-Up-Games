import React from 'react';
import ReactDOM from 'react-dom';
import Logout from './components/logout/Logout.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import NavBar from './components/NavBar.jsx';

import {
  HashRouter,
  Route,
<<<<<<< HEAD
  Link
=======
  Link,
  blueirect,
  withRouter
>>>>>>> style navbar
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
            {/* Top Bar */}
            <div className="top">
              <div className="w3-bar w3-blue w3-card w3-left-align w3-large">
                <Link to="/login" style={this.state.loggedIn ? {display:'none'} : {} } className="w3-button w3-padding-large w3-white">Login</Link>
              </div>


            {/* First Grid */}
            <header class="w3-container w3-blue w3-center" id="homeheader" style={this.state.loggedIn ? {display:'none'} : {} }>
              <h1 class="w3-margin w3-jumbo">Pop-Up-Games</h1>
              <p class="w3-xlarge">Play Games! Have Fun!</p>
              <Link to="/signup" style={this.state.loggedIn ? {display:'none'} : {} }  class="w3-button w3-white w3-padding-large w3-large w3-margin-top">Sign Up</Link>
            </header>
            <Route path="/login"
              render={props => <Login
                loggedIn={this.state.loggedIn}
                toggleAuth={this.toggleLogin.bind(this)} {...props} />} />
            <Route path="/signup"
              render={props => <Signup />} />

            {/* Second Grid */}

            <div class="w3-row-padding w3-padding-64 w3-container" style={this.state.loggedIn ? {display:'none'} : {} }>
              <div class="w3-content">
                <div class="w3-twothird">
                  <h1>What We Do</h1>
                  <h5 class="w3-padding-32 w3-text-grey" >We here love sports and we want make it fun and easy to find sport games in your local area. Find and join a game or go on and create your own. Go out and have fun!</h5>

                </div>

                <div class="w3-third w3-center">
                  <img src='./bluebasketballicon.png' height="300" />
                </div>
              </div>
            </div>

              <Route path="/logout"
              render={props => <Logout
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


//moved logOut to navbar
// <div class="w3-bar w3-blue w3-card w3-left-align w3-large">
//   <Link to="/logout" style={this.state.loggedIn ? {} : {display:'none'} } className="w3-button w3-padding-large w3-white">Logout</Link>
// </div>