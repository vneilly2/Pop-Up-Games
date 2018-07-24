import React from 'react';
import axios from 'axios';
import utils from '../../../utils';
import Login from '../login/Login.jsx';

import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      username: '',
      fname: '',
      lname: '',
      address: '',
      password: '',
      passwordretype: '',
      email: '',
      attemptedpw: false,
      blankInputs: false,
      createdNewUser: false,
      userExists: false
    };
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
    this.state.attemptedpw = false;
    this.state.blankInputs = false;
    this.state.userExists = false;
    if(this.state.password !== this.state.passwordretype) {
      this.setState({ attemptedpw: true });
    } else if (
      this.state.username === '' ||
      this.state.fname === '' ||
      this.state.lname === '' ||
      this.state.address === '' ||
      this.state.password === '' ||
      this.state.passwordretype === '' ||
      this.state.email === ''
      ) {
      this.setState({blankInputs: true});
    } else {
      let newUser = {
        username: this.state.username,
        firstname: this.state.fname,
        lastname: this.state.lname,
        address: this.state.address,
        password: this.state.password,
        email: this.state.email,
      }
      this.createUser(newUser);
    }
  }

  createUser(params) {
    axios.post( '/signup', params, {
      headers: {
      }
    })
    .then((response) => {
      this.props.history.push("/login");
    })
    .catch((error) => {
      if(error.response.status === 400) {
        this.setState({userExists:true});
      } else {
        utils.errorHandler(error);
      }
    })
    ;
  }

  render() {
      return(
        <div>
          <div style={this.state.blankInputs ? {color: 'red'} : {display:'none'}}>
            <a>
              *All fields are required
            </a><br/>
          </div>
          <div style={this.state.userExists ? {color: 'red'} : {display:'none'}}>
            <a>
              *Username is already taken
            </a><br/>
          </div>
          <a>Username:</a><input
          type="text"
          name="username"
          onChange={(event) => this.updateState(event)}
          onKeyPress={(event) => this.handleEnter(event)}
          /><br/>
          <a>First Name:</a><input
          type="text"
          name="fname"
          onChange={(event) => this.updateState(event)}
          onKeyPress={(event) => this.handleEnter(event)}
          /><br/>
          <a>Last Name:</a><input
          type="text" name="lname"
          onChange={(event) => this.updateState(event)}
          onKeyPress={(event) => this.handleEnter(event)}/><br/>
          <div style={this.state.invalidAddress ? {color: 'red'} : {display:'none'}}>
            <a>
            *Your address was invalid
            </a><br/>
          </div>
          <a>Address:</a><input
          type="text" name="address"
          onChange={(event) => this.updateState(event)}
          onKeyPress={(event) => this.handleEnter(event)}/><br/>
          <a>Email:</a><input
          type="text" name="email"
          onChange={(event) => this.updateState(event)}
          onKeyPress={(event) => this.handleEnter(event)}/><br/>
          <div style={this.state.attemptedpw ? {color: 'red'} : {display:'none'}}>
            <a>
            *Your passwords don't match</a><br/>
            </div>
          <a>Password:</a><input
          type="password"
          name="password"
          onChange={(event) => this.updateState(event)}
          onKeyPress={(event) => this.handleEnter(event)}/><br/>
          <a>Retype-Password:</a><input
          type="password"
          name="passwordretype"
          onChange={(event) => this.updateState(event)}
          onKeyPress={(event) => this.handleEnter(event)}/><br/>
          <button type="button" onClick={() => this.processForm() } >Submit</button>
        </div>
        )
  }
}
(event) => this.handleEnter(event)
export default withRouter(SignupForm);