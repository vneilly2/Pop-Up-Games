import React from 'react';
import LoginStatus from '../LoginStatus.jsx';
import NavBar from '../NavBar.jsx';
import FieldCalendar from './FieldCalendar.jsx';
import FieldInfo from './FieldInfo.jsx';

var Field = (props) => (

  <div>
    <LoginStatus />
    <h1>Field Page</h1>
    <NavBar />
    <FieldInfo />
    <FieldCalendar />
  </div>
  )

export default Field;