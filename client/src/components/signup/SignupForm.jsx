import React from 'react';
import axios from 'axios';
import utils from '../../../utils';
import Login from '../login/Login.jsx';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      username: '',
      fname: '',
      lname: '',
      address: '',
      password: '',
      passwordretype: '',
      email: '',
      attemptedpw: false,
      otherErrors: false,
      createdNewUser: false
    };
  }

  updateState(event) {
    this.setState({[event.target.name]: event.target.value });
  }

  processForm() {
    this.setState({ attemptedpw: false, otherErrors: false });
    if(this.state.password !== this.state.passwordretype) {
      this.setState({ attemptedpw: true });
    } else if (
      this.state.username === '' ||
      this.state.fname === '' ||
      this.state.lname === '' ||
      this.state.address === '' ||
      this.state.password === '' ||
      this.state.passwordretype === '' ||
      this.state.email === ''
      ) {
      this.setState({otherErrors: true});
    } else {
      let newUser = {
        username: this.state.username,
        firstname: this.state.fname,
        lastname: this.state.lname,
        address: this.state.address,
        password: this.state.password,
        email: this.state.email,
      }
      this.createUser(newUser);
    }
  }

  createUser(params) {
    axios.post( '/signup', params, {
      headers: {
      }
    })
    .catch((error) => {
      utils.errorHandler(error);
    })
    .then((response) => {
      this.setState({createdNewUser: true});
    });
  }

  render() {
    let pendingMistakes = [];
    if(this.state.attemptedpw) {
      pendingMistakes.push('*Your passwords do not match');
    }
    if(this.state.otherErrors) {
      pendingMistakes.push('*There are other unspecified errors');
    }
    if(this.state.createdNewUser) {
      return (<Redirect to='/login'  />)
    } else {
      return(
        <div>
        {
          pendingMistakes.map((mistake, index) => {
            return (
              <a style={ {'color':'red'} }key={index} >{mistake}</a>
              )
          })
        }
          <br/><a>Username:</a><input type="text" name="username" onChange={(event) => this.updateState(event)} /><br/>
          <a>First Name:</a><input type="text" name="fname" onChange={(event) => this.updateState(event)} /><br/>
          <a>Last Name:</a><input type="text" name="lname" onChange={(event) => this.updateState(event)} /><br/>
          <a>Address:</a><input type="text" name="address" onChange={(event) => this.updateState(event)} /><br/>
          <a>Email:</a><input type="text" name="email" onChange={(event) => this.updateState(event)} /><br/>
          <a>Password:</a><input type="text" name="password" onChange={(event) => this.updateState(event)} /><br/>
          <a>Retype-Password:</a><input type="text" name="passwordretype" onChange={(event) => this.updateState(event)} /><br/>
          <button type="button" onClick={() => this.processForm() } >Submit</button>
        </div>
        )
    }
  }
}

export default SignupForm;