import React from 'react';
import Guest from './Guest.jsx';

var GuestList = (props) => (
  <div>
  <ul>
    <h3 className="center">Number Attending: {props.GuestList.length}</h3>
    <div className="center"></div>
    {
      props.GuestList.map((guest, index) => {
        return(<Guest guest={guest} key={index} />)
      })
    }
  </ul>
  </div>
  )


export default GuestList;