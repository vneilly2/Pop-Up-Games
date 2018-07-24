import React from 'react';
import axios from 'axios';
import utils from '../../../utils.js';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';

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
      this.createVenue(newField);
    }
  }

  createVenue(params) {
    axios.post( '/field', params, { headers: {}})
    .catch((error) => {
      this.errorHandler(error);
    })
    .then((response) => {
      console.log('Successful post fired', response);
    });
  }


  render() {
    return (
      <div>
        <FormError check={this.state.blankFields} message={'*Your username and password cannot be blank'} />
        <FormField
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