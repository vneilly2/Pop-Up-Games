import React from 'react';
import Guest from './Guest.jsx';

var GuestList = (props) => (
  <div>
  <ul>
    Here is a list of guests
    {
      props.GuestList.map((guest, index) => {
        return(<Guest guest={guest} key={index} />)
      })
    }
  </ul>
  </div>
  )


export default GuestList;