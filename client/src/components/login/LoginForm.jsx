import React from 'react';
import axios from 'axios';
import utils from '../../../utils';
import Signup from '../signup/Signup.jsx';

import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      username: '',
      password: '',
      failedLogin: false,
      blankSubmit: false
    };
    this.toggleAuth = props.toggleAuth;
  }

  updateState(event) {
    this.setState({[event.target.name]: event.target.value });
  }

  handleEnter (event) {
    if(event.key === 'Enter') {
      this.processForm();
    }
  }

  processForm() {
    this.state.blankSubmit = false;
    this.state.failedLogin = false;
    if(this.state.username === '' || this.state.password === '') {
      this.setState({blankSubmit: true, password: ''});
    } else {
      let loginCreds = {
        username: this.state.username,
        password: this.state.password
      };
      this.processLogin(loginCreds);
    }
  }

  processLogin(params) {
    axios.post( '/login', params, {
      headers: {
      }
    })
    .then((response) => {
      this.toggleAuth(true);
      this.props.history.push("/home");

    })
    .catch((error) => {
      if(error) {
        if(error.response.status === 422 || error.response.status === 404) {
          this.setState({failedLogin:true});
        } else {
          console.log(error.response);
        }
      }
    });
  }

  render() {
      return (
        <div>
          <div style={this.state.blankSubmit ? {color: 'red'} : {display:'none'}}>
            <a>
              *Your username and password cannot be blank
            </a><br/>
          </div>
          <div style={this.state.failedLogin ? {color: 'red'} : {display:'none'}}>
            <a>
              *There was a problem with your login
            </a><br/>
          </div>
          <a>Username:</a><input
          type="text"
          name="username"
          onChange={(event) => this.updateState(event)}
          onKeyPress={(event) => this.handleEnter(event)}
          /><br/>
          <a>Password:</a><input
          type="password"
          name="password"
          onChange={(event) => this.updateState(event)}
          onKeyPress={(event) => this.handleEnter(event)}
          /><br/>
          <button type="button" onClick={() => this.processForm() } >Submit</button>

          <HashRouter>
            <div>
              <Link to="/signup">Signup Form</Link>
              <Route path="/signup" component={Signup} />
            </div>
          </HashRouter>
        </div>
        )
  }
}

export default withRouter(LoginForm);