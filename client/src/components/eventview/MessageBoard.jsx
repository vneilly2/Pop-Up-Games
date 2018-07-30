import React from 'react';
import Message from './Message.jsx';
import PropTypes from 'prop-types';

/**
 * @description component that renders a list of message components
 */
var MessageBoard = props => {
  return (
    <div>
      <ul>
        <h3 className="center">Message Board</h3>
        {props.messages.map((message, index) => {
          return <Message message={message} key={index} />;
        })}
      </ul>
    </div>
  );
};

MessageBoard.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default MessageBoard;
