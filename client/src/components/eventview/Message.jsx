import React from 'react';
import moment from 'moment';

var Message = (props) => {
  return (
  <div className="message">
    <div>
      {`Name ${props.message.userId}`}
    </div>
    <div>
      {`Posted At: ${moment(props.message.created_at).format('LLLL')}`}
    </div>
    <div>
      {`Message: ${props.message.body}`}
    </div>
  </div>
  )
}

export default Message;