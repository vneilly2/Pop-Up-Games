import React from 'react';
import axios from 'axios';
import utils from '../../../utils';

class CreateVenueForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address:'',
      phone:'',
    };
  }

  updateState(event) {
    this.setState({[event.target.name]: event.target.value });
  }

    processForm() {
    this.setState({otherErrors: false });
    if (
      this.state.name === '' ||
      this.state.address === ''
      ) {
      this.setState({otherErrors: true});
    } else {
      let newVenue = {
        name: this.state.name,
        address: this.state.address,
        phone: this.state.phone
      }
      this.createVenue(newVenue);
    }
  }

  createVenue(params) {
    let options = {
      headers: {
      },
      params: params
    };

    axios.post( 'https://localhost:3000/', options)
    .catch((error) => {
      utils.errorHandler(error);
    })
    .then((response) => {
      console.log('Successful post fired', response);
    });
  }


  render() {
    let pendingMistakes =[];
    if(this.state.otherErrors) {
      pendingMistakes.push('*There are other unspecified errors');
    }
    return (
      <div>
      {
          pendingMistakes.map((mistake, index) => {
            return (
              <a style={ {'color':'red'} }key={index} >{mistake}</a>
              )
          })
        }
        <br/><a>Venue Name:</a><input type="text" name="name" onChange={(event) => this.updateState(event)} /><br/>
        <a>Address:</a><input type="text" name="address" onChange={(event) => this.updateState(event)} /><br/>
        <a>Phone Number:</a><input type="text" name="phone" onChange={(event) => this.updateState(event)} /><br/>
        <button type="button" onClick={() => this.processForm() } >Submit</button>
      </div>)
  }
}

export default CreateVenueForm;