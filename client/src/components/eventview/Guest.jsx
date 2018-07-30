import React from 'react';
import PropTypes from 'prop-types';

/**
 * @desctption simple component to hold and individual guest in the guestlist
 * todo I feel like this could be dressed up much better
 */
var Guest = props => (
  <li>
    <div>{`${props.guest.firstName} ${props.guest.lastName}`}</div>
  </li>
);

Guest.propTypes = {
  guest: PropTypes.object.isRequired,
};

export default Guest;
