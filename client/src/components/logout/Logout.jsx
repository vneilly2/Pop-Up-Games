import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

/**
 * Logs the user out
 *
 * input: props value of toggleAuth. Which should be a function
 * bound to the parent App Component that takes an input of a boolean
 * which it will set the value of the state of loggedIn on the
 * parent Components state to
 */
var Logout = (props) => {

    axios.get('/logout')
    .catch((error) => {
      console.log(error);
    })
    .then((response) => {
      if(response.status === 200) {
        props.toggleAuth(false);
      } else {
        console.log(results);
      }
    });

    return(
    <Redirect to={'/login'} />
    )
}

export default Logout;