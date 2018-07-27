import React from 'react';
import Message from './Message.jsx';

var MessageBoard = (props) => (
  <div>
    <ul>
      <h3 className="w3-center">Message Board</h3>
      {
        props.messages.map((message, index) => {
          return (<Message message={message} key={index} />)
        })
      }
    </ul>
  </div>
  )

export default MessageBoard;