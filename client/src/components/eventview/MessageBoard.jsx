import React from 'react';
import Message from './Message.jsx';

var MessageBoard = (props) => {
  return(
  <div>
    <ul>
      <h3 className="center">Message Board</h3>
      {
        props.messages.map((message, index) => {
          return (<Message message={message} key={index} />)
        })
      }
    </ul>
  </div>
  )
}

export default MessageBoard;