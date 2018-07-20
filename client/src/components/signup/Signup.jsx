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

  render() {
    return(<div>
      <h1>Signup Page</h1>
      <SignupForm />
    </div>)
  }
}

export default Signup;