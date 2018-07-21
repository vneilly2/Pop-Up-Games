import React from 'react';
import axios from 'axios';
import utils from '../../../utils'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      username: '',
      password: '',
      failedLogin: []
    };
    this.onUpdate = props.onUpdate;
  }

  updateState(event) {
    this.setState({[event.target.name]: event.target.value });
  }

  processForm() {
    let loginCreds = {
      username: this.state.username,
      password: this.state.password
    };
    this.processLogin(loginCreds);
  }

  processLogin(params) {
    axios.post( '/login', params, {
      headers: {
      }
    })
    .then((response) => {
      this.onUpdate(true);
    })
    .catch((error) => {
      if(error) {

      }
      utils.errorHandler(error);
    });
  }

  render() {
    let failedLoginReasons = [];
    return (
      <div>
      {
        this.state.failedLogin.map((reason, index) => {
          return (<div><a style={ {'color':'red'} }>{reason}</a><br/></div>)
        })
      }
        <a>Username:</a><input type="text" name="username" onChange={(event) => this.updateState(event)} /><br/>
        <a>Password:</a><input type="text" name="password" onChange={(event) => this.updateState(event)} /><br/>
        <button type="button" onClick={() => this.processForm() } >Submit</button>
      </div>
      )
  }
}

export default LoginForm;