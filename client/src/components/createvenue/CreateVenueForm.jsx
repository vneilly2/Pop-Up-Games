import React from 'react';
import axios from 'axios';
import utils from '../../../utils';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';

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
        phone: this.state.phone
      };
      this.createVenue(newVenue);
    }
  }

  createVenue(params) {
    axios.post( '/venue', params, { headers: {}})
    .then((response) => {
      console.log('Successful post fired', response);
    })
    .catch((error) => {
      utils.errorHandler(error);
    });
  }


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
          fieldName={'this'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
        <FormField
          txtId={'Phone number'}
          fieldName={'phone'}
          updateState={this.updateState.bind(this)}
          handleEnter={this.handleEnter.bind(this)} />
        <button type="button" onClick={() => this.processForm() } >Submit</button>
      </div>)
  }
}

export default CreateVenueForm;