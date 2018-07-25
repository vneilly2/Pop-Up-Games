import React from 'react';
import axios from 'axios';
import utils from '../../../utils';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';

/**
 * A form for creating new Venues and saving them to the database
 * expects no input props
 */
class CreateVenueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address:'',
      phone:'',
      blankFields:false,
      badAddress: false
    };
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
 * call are filled.  If they are, it calls createVenue.
 * If they are not all supplied it turn booleans for
 * first failed requirement to true so the DOM can
 * render messages to user accordingly
 *
 * input: none
 * output: none
 */
  processForm() {
    this.state.blankFields = false;
    if (
      this.state.name === '' ||
      this.state.address === ''
      ) {
      this.setState({blankFields: true});
    } else {
      let newVenue = {
        name: this.state.name,
        address: this.state.address,
      };
      this.createVenue(newVenue);
    }
  }

/**
 * Takes a set of parameters as values in an object
 * and executes a post request to the /venue endpoint on the server
 * If successful it will redirect the user to the new Venues page
 * If it fails it will evaluate the error message to indicate
 * to the state of the component which aspect of the post failed
 * so the reason for the failed request can be rendered to the DOM
 * inputs: params in the following structure:
 *
 * input:
 * {name:     string,
 *  address:  string,
 *  phone:    string, };
 *
 * error.response.status indications:
 *
 */
  createVenue(params) {
    axios.post( '/venue', params, { headers: {}})
    .then((response) => {
      console.log('Successful post fired', response);
    })
    .catch((error) => {
      utils.errorHandler(error);
    });
  }

/**
 * Renders a form to the DOM to gather the required inputs used
 * to create a new venue.  All inputs update Component state on change.
 * Pressing the form submit button or the enter key in any input will
 * trigger the process form function
 */
  render() {
    return (
      <div>
        <FormError check={this.state.blankFields} message={'*Fields with a * are required'} />
        <FormField
          txtId={'*Venue Name'}
          fieldName={'name'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
        <FormError check={this.state.badAddress} message={'*Address was invalid'} />
        <FormField
          txtId={'*Address'}
          fieldName={'address'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
        <button type="button" onClick={() => this.processForm() } >Submit</button>
      </div>)
  }
}

export default CreateVenueForm;