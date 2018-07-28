import React from 'react';
import Guest from './Guest.jsx';

var GuestList = (props) => (
  <div>
  <ul>
    <h3 className="w3-center">{props.GuestList.length} Attending</h3>
    {
      props.GuestList.map((guest, index) => {
        return(<Guest guest={guest} key={index} />)
      })
    }
  </ul>
  </div>
  )


export default GuestList;