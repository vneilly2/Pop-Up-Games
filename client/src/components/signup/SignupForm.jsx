import React from 'react';
import axios from 'axios';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";


/**
 * @description Sign up form that allows new users to add them
 * accounts for the App
 * expects no props to be passed in
 */
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
      userExists: false,
      invalidAddress: false,
    };
  }
/**
 * @description helper function that updates states of component
 * uses name of input field as state name and value of
 * input field as desired state
 * @param { <Object> } event typical event from html onChange
 * @example
 * <input type={text} 
 * name={targetName} 
 * value={targetValue} 
 * onChange={this.updateState} 
 * />
 * ...
 * this.setState({targetName: targetValue})
 * @return { undefined } undefined
 */

updateState(event) {
  this.setState({[event.target.name]: event.target.value });
};

/**
* @description helper function that updates states of component
* uses name of input field as state name and value of
* input field as desired state
* @param { <Object> } event typical event from html onKeyPress
* @return { undefined } undefined
*/
handleEnter(event) {
  if(event.key === 'Enter') {
    this.processForm();
  }
};

/**
 * @description function that evalutes all the current input states
 * to see whether or not all fields needed for axios
 * call are filled.  Is they are it calls createUser.
 * If they are not all supplied it turn booleans for
 * first failed requirement to true so the DOM can
 * render messages to user accordingly
 *
 * @returns { undefined } undefined
 */
  processForm() {
    this.state.attemptedPw = false;
    this.state.blankInputs = false;
    this.state.userExists = false;
    this.state.invalidAddress = false;
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

/**
 * @description Takes a set of parameters as values in an object
 * and executes a post request to the signup endpoint on the server
 * If successful it will redirect the user to the login page
 * If it failes it will evaluate the error message to indicate
 * to the state of the component which aspect of the post failed
 * so the reason for the failed request can be rendered to the DOM
 * inputs: params in the following structure:
 * @param {{username: String, firstname: String, lastname: string, address: string, password: string, email: string}} params requested unique username
 * 
 * @example 
 * if(success) new account created
 * if(error.response.status == 400) {
 * _ if(error.response.message === 'improper address') address invalid
 * _ else username already taken
 * }
 * 
 * @return { undefined } undefined 
 */
  createUser(params) {
    axios.post( '/api/signup', params, { headers: {}})
    .then((success) => {
      this.props.history.push("/login");
    })
    .catch((error) => {
      if(error.response.status === 400) {
        if(error.response.message === 'improper address') {
          this.setState({invalidAddress:true});
        } else {
          this.setState({userExists:true});
        }
      } else {
        this.errorHandler(error);
      }
    });
  }

/**
 * @description Renders a form to the DOM to gather the required inputs used
 * to create a new user.  All inputs update Component state on change.
 * Pressing the form submit button or the enter key in any input will
 * trigger the process form function
 */
  render() {
      return(
        <div className="form-style">
          <h1>Sign Up</h1>
          <FormError check={this.state.blankInputs} message={'*All fields are required'} />
          <FormError check={this.state.userExists} message={'*Username is already taken'} />
          <FormField className="input"
            txtId={'Username'}
            fieldName={'username'}
            updateState={this.updateState.bind(this)}
            handleEnter={this.handleEnter.bind(this)} 
          />
          <FormField className="input"
            txtId={'First Name'}
            fieldName={'fname'}
            updateState={this.updateState.bind(this)}
            handleEnter={this.handleEnter.bind(this)} 
          />
          <FormField className="input"
            txtId={'Last Name'}
            fieldName={'lname'}
            updateState={this.updateState.bind(this)}
            handleEnter={this.handleEnter.bind(this)} 
          />
          <FormError check={this.state.invalidAddress} message={'*Your address was invalid'} />
          <FormField className="input"
            txtId={'Address'}
            fieldName={'address'}
            updateState={this.updateState.bind(this)}
            handleEnter={this.handleEnter.bind(this)} 
          />
          <FormField className="input"
            txtId={'Email'}
            fieldName={'email'}
            updateState={this.updateState.bind(this)}
            handleEnter={this.handleEnter.bind(this)} 
          />
          <FormError check={this.state.attemptedPw} message={'*Your passwords don\'t match'} />
          <FormField className="input"
            txtId={'Password'}
            fieldName={'password'}
            updateState={this.updateState.bind(this)}
            handleEnter={this.handleEnter.bind(this)}
            isPassword={true} 
          />
          <FormField className="input"
            txtId={'Retype Password'}
            fieldName={'passwordRetype'}
            updateState={this.updateState.bind(this)}
            handleEnter={this.handleEnter.bind(this)}
            isPassword={true} 
          />
          <button type="button" onClick={() => this.processForm() } >Submit</button>
        </div>
        )
  }
}

export default withRouter(SignupForm);