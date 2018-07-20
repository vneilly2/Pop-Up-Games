import React from 'react';
import axios from 'axios';
import utils from '../../../utils';

class CreateFieldForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      notes:'',
      venueid:'',
    };
  }

  updateState(event) {
    this.setState({[event.target.name]: event.target.value });
  }

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
        <br/><a>Field Type:</a><input type="text" name="type" onChange={(event) => this.updateState(event)} /><br/>
        <a>Notes:</a><input type="text" name="notes" onChange={(event) => this.updateState(event)} /><br/>
        <button type="button" onClick={() => this.processForm() } >Submit</button>
      </div>)
  }
}

export default CreateFieldForm;