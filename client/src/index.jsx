import React from 'react';
import ReactDOM from 'react-dom';
import Logout from './components/logout/Logout.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import NavBar from './components/NavBar.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      signupStep: false,
      loginStep: false,
      target: false,
    };
  }
  /**
   * @description changes the value of App.state.loggedIn
   * should be bound before passing to another component
   * @param { boolean } state the desired state of loggedIn
   * @return { null } nothing
   */
  toggleLogin(state) {
    this.setState({ loggedIn: state, loginStep: false, signupStep: false });
  }

  toggleSignupStep(state){
    this.setState({signupStep: state})
  }

  toggleLoginStep(state){
    this.setState({loginStep: state})
  }

  changeTarget(target){
    this.setState({target: target})
  }


  /**
   * @description renders the body of the App
   * contains conditionally rendered components when not logged in:
   * Sign up & Login
   *
   * and when logged in:
   * Logout
   * As well as a navigation bar as a hash router for all
   * feature supporting components
   */
  render() {
      return (
        <div>
          <Router>
            <div>
              <div style={this.state.loggedIn ? {} : {display:'none'} } >
                <NavBar 
                  userInfo={this.state.loggedIn} 
                  toggleAuth={this.toggleLogin.bind(this) }
                  changeTarget={this.changeTarget.bind(this)}
                  target={this.state.target}
                />
              </div>
            {/* Top Bar */}
            <div className="top">
              <div className="bar blue left-align large">
                <Link to="/login" style={ ( this.state.loggedIn || this.state.loginStep ) ? {display:'none'} : {} } className="button padding-large white" onClick={() => { this.toggleSignupStep(false); this.toggleLoginStep(true) }}>Login</Link>
                <Link to="/signup" style={ ( this.state.loggedIn || this.state.signupStep ) ? {display:'none'} : {} }  className="button padding-large white" onClick={() => { this.toggleSignupStep(true); this.toggleLoginStep(false) }}>Sign Up</Link>
              </div>
            </div>

            {/* First Grid */}
            <header className="container blue center padding-32" id="homeheader" style={this.state.loggedIn || this.state.loginStep || this.state.signupStep ? {display:'none'} : {} }>
              <h1 className="margin jumbo">Pop-Up-Games</h1>
              <p className="xlarge">Play Games! Have Fun!</p>
              <Link to="/signup" style={ this.state.loggedIn ? {display:'none'} : {} }  className="button white padding-large large margin-top" onClick={this.toggleSignupStep.bind(this)}>Sign Up</Link>
            </header>
            <Route path="/login"
              render={props => <Login
                loggedIn={this.state.loggedIn}
                toggleAuth={this.toggleLogin.bind(this)} {...props} />} />
            <Route path="/signup"
              render={props => <Signup />} />

            {/* Second Grid */}
            <div className="row-padding padding-64 container" style={this.state.loggedIn || this.state.loginStep || this.state.signupStep ? {display:'none'} : {} }>
              <div className="content">
                <div className="twothird">
                  <h1>What We Do</h1>
                  <h5 className="padding-32 text-grey" >We here love sports and we want to make it fun and easy to find sport games in your local area. Use our site to find and join games near you. Or go on and create your own! Go out and have fun!</h5>
                </div>

                <div className="third center">
                  <img src='./img/basketballcartoon.png' height="200" />
                </div>
              </div>
            </div>
            
            {/*Quote Section */}
            <div className=" container center-quote" style={this.state.loggedIn || this.state.loginStep || this.state.signupStep ? {display:'none'} : {} }>
                <div className="content padding">
                  <h1 className="margin large">"Just play. Have fun. Enjoy the game." -Michael Jordan</h1>
                </div>
            </div>

            {/* Footer */}
            <footer className="container padding-32 center" style={this.state.loggedIn || this.state.loginStep || this.state.signupStep ? {display:'none'} : {} }>  
              <p>Made at <a href="https://www.hackreactor.com/" target="_blank">Hack Reactor</a></p>
            </footer>


              <Route path="/logout"
              render={props => <Logout
                toggleAuth={this.toggleLogin.bind(this)} {...props} />} />
            </div>
          </Router>
        </div>
        )
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
