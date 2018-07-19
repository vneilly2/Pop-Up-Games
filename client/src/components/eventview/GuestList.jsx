import React from 'react';
import Guest from './Guest.jsx';

var GuestList = (props) => (
  <div>
  <ul>
    Here is a list of guests
    {
      props.GuestList.forEach((guest, index) => {
        <Guest guest={guest} key={index} />
      })
    }
  </ul>
  </div>
  )


export default GuestList;