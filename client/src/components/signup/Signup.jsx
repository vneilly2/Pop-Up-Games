import React from 'react';
import SignupForm from './SignupForm.jsx';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createdUser: false,
      badPassword: false,
      duplicateUser: false
    };
  }

  onSubmit() {
    this.createUser();
  }

  createUser(params) {
    let options = {
      headers: {
      },
      params: {
        username: params.username,
        firstname: params.fname,
        lastname: params.lname,
        password: params.password
      }
    };

    axios.post( 'https://localhost:3000/', options)
    .catch((error) => {
      utils.errorHandler(error);
    })
    .then((response) => {
      this.setState = {
      };
    });
  }

  render() {
    return(<div>
      <h1>Signup Page</h1>
      <SignupForm onSubmit={this.onSubmit.bind(this)} />
    </div>)
  }
}

export default Signup;