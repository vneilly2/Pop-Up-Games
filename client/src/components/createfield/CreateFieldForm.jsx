import React from 'react';
import axios from 'axios';
import utils from '../../../utils.js';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';

/**
 * A form for creating new Venues and saving them to the database
 * expects no input props
 */
class CreateFieldForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      notes:'',
      venueid:'',
      blankFields:false
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
  console.log(this);
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
 * call are filled.  If they are, it calls createField.
 * If they are not all supplied it turn booleans for
 * first failed requirement to true so the DOM can
 * render messages to user accordingly
 *
 * input: none
 * output: none
 */
  processForm() {
    this.setState({otherErrors: false });
    if (
      this.state.type === '' ||
      this.state.notes === ''
      ) {
      this.setState({otherErrors: true});
    } else {
      let newField = {
        type: this.state.type,
        notes: this.state.notes,
        venueid: this.state.venueid
      };
      this.createField(newField);
    }
  }

/**
 * Takes a set of parameters as values in an object
 * and executes a post request to the /field endpoint on the server
 * If successful it will redirect the user to new fields page
 * If it fails it will evaluate the error message to indicate
 * to the state of the component which aspect of the post failed
 * so the reason for the failed request can be rendered to the DOM
 * inputs: params in the following structure:
 *
 * input:
 * {type:       string,
 *  notes:      string,
 *  venueid:    string, };
 *
 * error.response.status indications:
 *
 */
  createField(params) {
    axios.post( '/field', params, { headers: {}})
    .catch((error) => {
      this.errorHandler(error);
    })
    .then((response) => {
      console.log('Successful post fired', response);
    });
  }

/**
 * Renders a form to the DOM to gather the required inputs used
 * to create a new field.  All inputs update Component state on change.
 * Pressing the form submit button or the enter key in any input will
 * trigger the process form function
 */
  render() {
    return (
      <div className='form-style'>
        <h1>Create Field</h1>
        <FormError check={this.state.blankFields} message={'*Your username and password cannot be blank'} />
        <FormField input
          txtId={'Field Type'}
          fieldName={'type'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
        <FormField
          txtId={'Notes'}
          fieldName={'notes'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
        <button type="button" onClick={() => this.processForm() } >Submit</button>
      </div>)
  }
}

export default CreateFieldForm;