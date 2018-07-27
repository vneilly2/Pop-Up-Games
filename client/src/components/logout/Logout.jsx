import React from 'react';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router';
import axios from 'axios';

/**
 * @description Logs the user out
 */
var Logout = (props) => {
  axios.get('/api/logout')
  .then((response) => {
    if(response.status === 200) {
      props.toggleAuth(false);
    } else {
      console.log(results);
    }
  })
  .catch((error) => {
    console.log(error);
  });

  return(
    <Redirect to={'/login'} />
  )
}
Logout.propTypes = {
  toggleAuth: PropTypes.func.isRequired
}
export default Logout;