import React from 'react';
import axios from 'axios';
import utils from '../../../utils';
import Login from '../login/Login.jsx';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';

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
      passwordRetype: '',
      email: '',
      attemptedPw: false,
      blankInputs: false,
      createdNewUser: false,
      userExists: false
    };
  }

  updateState(event) {
  console.log(this);
    this.setState({[event.target.name]: event.target.value });
  };

  handleEnter(event) {
    if(event.key === 'Enter') {
      this.processForm();
    }
  };

  processForm() {
    this.state.attemptedPw = false;
    this.state.blankInputs = false;
    this.state.userExists = false;
    if(this.state.password !== this.state.passwordRetype) {
      this.setState({ attemptedPw: true });
    } else if (
      this.state.username === '' ||
      this.state.fname === '' ||
      this.state.lname === '' ||
      this.state.address === '' ||
      this.state.password === '' ||
      this.state.passwordRetype === '' ||
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
      };
      this.createUser(newUser);
    }
  }

  createUser(params) {
    axios.post( '/signup', params, { headers: {}})
    .then((success) => {
      this.props.history.push("/login");
    })
    .catch((error) => {
      if(error.response.status === 400) {
        this.setState({userExists:true});
      } else {
        this.errorHandler(error);
      }
    });
  }

  render() {
      return(
        <div>
          <FormError check={this.state.blankInputs} message={'*All fields are required'} />
          <FormError check={this.state.userExists} message={'*Username is already taken'} />
          <FormField
          txtId={'Username'}
          fieldName={'username'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
          <FormField
          txtId={'First Name'}
          fieldName={'fname'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
          <FormField
          txtId={'Last Name'}
          fieldName={'lname'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
          <FormError check={this.state.invalidAddress} message={'*Your address was invalid'} />
          <FormField
          txtId={'Address'}
          fieldName={'address'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
          <FormField
          txtId={'Email'}
          fieldName={'email'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
          <FormError check={this.state.attemptedPw} message={'*Your passwords don\'t match'} />
          <FormField
          txtId={'Password'}
          fieldName={'password'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)}
          isPassword={true} />
          <FormField
          txtId={'Retype Password'}
          fieldName={'passwordRetype'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)}
          isPassword={true} />
          <button type="button" onClick={() => this.processForm() } >Submit</button>
        </div>
        )
  }
}

export default withRouter(SignupForm);