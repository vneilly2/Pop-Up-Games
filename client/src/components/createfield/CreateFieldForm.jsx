import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';
import utils from '../../../utils.js'
import { withRouter } from 'react-router-dom'

/**
 * @description A form for creating new Venues and saving them to the database
 * expects no input props
 * @param toggleAuth - function bound to App that changed state of loggedIn to arg[0]
 * @param venueId the id of the venue you are trying to add a field to
 */
class CreateFieldForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldName: '',
      notes:'',
      venueId: props.target.id,
      blankFields:false
    };
    this.toggleAuth = props.toggleAuth;
    this.changeTarget = props.changeTarget;
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
 * call are filled.  If they are, it calls createField.
 * If they are not all supplied it turn booleans for
 * first failed requirement to true so the DOM can
 * render messages to user accordingly
 *
 */
  processForm() {
    this.state.otherErrors=false;
    if (
      this.state.fieldName === '' ||
      this.state.notes === ''
      ) {
      this.setState({otherErrors: true});
    } else {
      let newField = {
        fieldName: this.state.fieldName,
        notes: this.state.notes,
        venueId: this.state.venueId
      };
      this.createField(newField);
    }
  }

/**
 * @description Takes a set of parameters as values in an object
 * and executes a post request to the /field endpoint on the server
 * If successful it will redirect the user to new fields page
 * If it fails it will evaluate the error message to indicate
 * to the state of the component which aspect of the post failed
 * so the reason for the failed request can be rendered to the DOM
 * inputs: params in the following structure:
 * @param {{fieldName: string, notes: string, venueId: string}} params requested unique username
 * @example 
 * if(success) newField created
 * if(error.response.status == ???) {
 * _ something happens
 * }
 * else newUser created
 * @return { undefined } undefined 
 */
  createField(params) {
    axios.post( '/api/field', params, { headers: {}})
    .then((response) => {
      this.props.history.push('venue');
    })
    .catch((error) => {
      if (error.response.status == 401 && error.response.data === "user not logged in"){
        this.toggleAuth(false);
      } else {
        utils.errorHandler(error);
      }
    });
  }

/**
 * @description Renders a form to the DOM to gather the required inputs used
 * to create a new field.  All inputs update Component state on change.
 * Pressing the form submit button or the enter key in any input will
 * trigger the process form function
 */
  render() {
    return (
      <div className='form-style'>
        <h1>Create Field</h1>
        <FormError check={this.state.blankFields} message={'*Your username and password cannot be blank'} />
        <FormField className="input"
          txtId={'Field Name'}
          fieldName={'fieldName'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
        <FormField className="input"
          txtId={'Notes'}
          fieldName={'notes'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
        <button type="button" onClick={() => this.processForm() } >Submit</button>
      </div>)
  }
}

CreateFieldForm.protoTypes = {
  toggleAuth: PropTypes.func.isRequired,
  venueId: PropTypes.string.isRequired,
}

export default withRouter(CreateFieldForm);