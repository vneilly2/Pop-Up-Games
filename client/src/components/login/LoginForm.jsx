import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';
import { Redirect, withRouter } from "react-router-dom";
/**
 * @description Log in form that allows new users log into the App
 * @param toggleAuth - function bound to App that changed state of loggedIn to arg[0]
 */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      username: '',
      password: '',
      failedLogin: false,
      blankSubmit: false,
    };
    this.toggleAuth = props.toggleAuth;
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
 * call are filled.  If they are it calls createUser.
 * If they are not all supplied it turn booleans for
 * first failed requirement to true so the DOM can
 * render messages to user accordingly
 *
 * 
 * @return { undefined } undefined
 */
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


/**
 * @description Takes a set of parameters as values in an object
 * and executes a post request to the login endpoint on the server
 * If successful it will redirect the user to the home page
 * If it failes it will evaluate the error message to indicate
 * to the state of the component which aspect of the post failed
 * so the reason for the failed request can be rendered to the DOM
 * inputs: params in the following structure:
 * @param {{ username: String, password: String }} params requested unique username
 * 
 * @example 
 * if(success) successfully signed in
 * if(error.response.status === 404 || error.response.status === 422) {
 * _ indicates either a password or a username are wrong
 * }
 * else newUser created
 * 
 * @return { undefined } undefined 
 */
  processLogin(params) {
    
    axios.post( '/api/login', params, { headers: {} })
    .then((response) => {
      this.loginUser(this.toggleAuth);
  }
   )
    .catch((error) => {
      console.log(error)
      if(error) {
        if(error.response.status === 422 || error.response.status === 404) {
          this.setState({failedLogin:true});
        } else {
          console.log(error.response);
        }
      }
    });
  }

  loginUser(loginFunc) {
    axios.get('/api/me')
    .then((response) => {
      this.toggleAuth(response.data);
      this.props.history.push("/home")
    })
    .catch((error) => {
      console.log(error);
    })
  }

/**
 * @description Renders a form to the DOM to gather the required inputs used
 * to log in a user.  All inputs update Component state on change.
 * Pressing the form submit button or the enter key in any input will
 * trigger the process form function
 */
  render() {
      return (
        <div className='form-style'>
          <h1>Log In</h1>
          <form>
          <FormError check={this.state.blankSubmit} message={'*Your username and password cannot be blank'} />
          <FormError check={this.state.failedLogin} message={'*There was a problem with your login'} />
          <FormField className="input"
            txtId={'Username'}
            fieldName={'username'}
            updateState={this.updateState.bind(this)}
            handleEnter={this.handleEnter.bind(this)} />
          <FormField className="input"
            txtId={'Password'}
            fieldName={'password'}
            updateState={this.updateState.bind(this)}
            handleEnter={this.handleEnter.bind(this)}
            isPassword={true} />
          <button type="button" onClick={() => this.processForm() } >Submit</button>
          </form>
        </div>
        )
  }
}
LoginForm.propTypes = {
  toggleAuth: PropTypes.func.isRequired
}

export default withRouter(LoginForm);