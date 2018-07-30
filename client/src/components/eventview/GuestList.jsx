import React from 'react';
import Guest from './Guest.jsx';
import PropTypes from 'prop-types';

/**
 * @description component to hold a list of guests to be rendered
 */
var GuestList = props => (
  <div>
    <ul>
      <h3 className="center">Number Attending: {props.GuestList.length}</h3>
      <div className="center" />
      {props.GuestList.map((guest, index) => {
        return <Guest guest={guest} key={index} />;
      })}
    </ul>
  </div>
);

GuestList.propTypes = {
  GuestList: PropTypes.array.isRequired,
};

export default GuestList;
