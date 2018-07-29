import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * @description component to render an individual message
 */
var Message = (props) => {
  return (
  <div className="message">
    <div>
      {`Name ${props.message.firstName} `${props.message.lastName}`}
    </div>
    <div>
      {`Message: ${props.message.body}`}
    </div>
    <div className="message-date">
      {`Posted At: ${moment(props.message.created_at).format('LLLL')}`}
    </div>
  </div>
  )
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
}

export default Message;
