import React from 'react'
import CreateEvent from './createevent/CreateEvent.jsx';
import CreateField from './createfield/CreateField.jsx';
import CreateVenue from './createvenue/CreateVenue.jsx';
import EventView from './eventview/EventView.jsx';
import Field from './field/Field.jsx';
import Home from './home/Home.jsx';
import Search from './search/Search.jsx';
import Venue from './venue/Venue.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
/**
 * @description Renders all the  React Router Navigation Links
 */
var NavBar = (props) => {
  let userInfo = props.userInfo;
  let toggleAuth = props.toggleAuth;
    return (
        <div className="top">
          <div className="w3-bar w3-blue w3-card w3-left-align w3-large">
            <Link to="/home" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white w3-left-align ">Home</Link>
            <Link to="/search" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white w3-left-align ">Search</Link>
            <Link to="/createvenue" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white w3-left-align ">Create</Link>
            <Link to="/logout" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white w3-left-align ">Logout</Link>
          </div>
          <div className="w3-bar w3-blue w3-card w3-left-align w3-large">
            <Link to="/field" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Field</Link>
            <Link to="/event" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Event</Link>
            <Link to="/venue" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Venue</Link>
            <Link to="/createvenue" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Create Venue</Link>
            <Link to="/createevent" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Create Event</Link>
            <Link to="/createfield" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Create Field</Link>
          </div>
          {/* <Route path="/home" component={Home} /> */}
          <Route path="/home"
              render={props => <Home
                toggleAuth={toggleAuth} userInfo={userInfo} {...props} />} />
          <Route path="/search" component={Search} />
          <Route path="/field" component={Field} />
          <Route path="/event" component={EventView} />
          <Route path="/venue" component={Venue} />
          <Route path="/createevent" component={CreateEvent} />
          <Route path="/createfield" component={CreateField} />
          <Route path="/createvenue" component={CreateVenue} />
        </div>
     );
  }

export default NavBar;