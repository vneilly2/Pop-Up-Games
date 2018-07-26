import React from 'react';
import Message from './Message.jsx';

var MessageBoard = (props) => (
  <div>
  <ul>
    Message Board
    {
      props.messages.map((message, index) => {
        return (<Message message={message} key={index} />)
      })
    }
  </ul>
  </div>
  )

export default MessageBoard;