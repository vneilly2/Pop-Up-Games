import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false
    };
    this.toggleAuth = props.toggleAuth;
  }

    componentDidMount() {
      this.logout();
    }
    logout() {
      axios.get('/logout')
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        if(response.status === 200) {
          this.toggleAuth(false);
          this.setState({loggedOut:true});
        } else {
          console.log(results);
        }
      });
    }

  render() {
    if(this.state.loggedOut !== true) {
      return(
        <div>
          Logging Out
        </div>)
    } else {
    return(
    <Redirect to={'/login'} />
    )
    }
  }
}

export default Logout;