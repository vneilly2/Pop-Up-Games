import React from 'react';

var MessageBoard = (props) => (
  <div>
  <ul>
    These are the messages for this MessageBoard
    {
      props.messages.map((message, index) => {
        return (<Message message={message} key={index} />)
      })
    }
  </ul>
  </div>
  )

export default MessageBoard;