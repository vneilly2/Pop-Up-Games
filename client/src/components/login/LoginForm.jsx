import React from 'react';
import axios from 'axios';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';
import { withRouter } from "react-router-dom";
/**
 * Log in form that allows new users log into the App
 *
 * expects to be passed props of toggleAuth.  Which should
 * be a function that is bound to the parent component and takes
 * in one boolean which is assigns the parants state of loggedIn to match
 */
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

/**
 * helper function that updates states of component
 * uses name of input field as state name and value of
 * input field as desired state
 *
 * example :
 * <input type={text} name={name} onChange={this.updateState}
 * would update the state `name` to value of text in input an any changes
 * to the field
 */
  updateState(event) {
    this.setState({[event.target.name]: event.target.value });
  };

/**
 * helper function that updates states of component
 * uses name of input field as state name and value of
 * input field as desired state
 */
  handleEnter(event) {
    if(event.key === 'Enter') {
      this.processForm();
    }
  };

/**
 * function that evalutes all the current input states
 * to see whether or not all fields needed for axios
 * call are filled.  Is they are it calls createUser.
 * If they are not all supplied it turn booleans for
 * first failed requirement to true so the DOM can
 * render messages to user accordingly
 *
 * input: none
 * output: none
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
 * Takes a set of parameters as values in an object
 * and executes a post request to the login endpoint on the server
 * If successful it will redirect the user to the home page
 * If it failes it will evaluate the error message to indicate
 * to the state of the component which aspect of the post failed
 * so the reason for the failed request can be rendered to the DOM
 * inputs: params in the following structure:
 *
 * input:
 * {username:   string,
 *  password:  string, };
 *
 * error.response.status indications:
 * 422 && 404 = indicates either password or username are wrong
 */
  processLogin(params) {
    axios.post( '/login', params, { headers: {} })
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

/**
 * Renders a form to the DOM to gather the required inputs used
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

export default withRouter(LoginForm);