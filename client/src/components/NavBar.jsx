import React from 'react'
import CreateEvent from './createevent/CreateEvent.jsx';
import CreateField from './createfield/CreateField.jsx';
import CreateVenue from './createvenue/CreateVenue.jsx';
import EventView from './eventview/EventView.jsx';
import Field from './field/Field.jsx';
import Home from './home/Home.jsx';
import Search from './search/Search.jsx';
import Venue from './venue/Venue.jsx';
import Signup from './signup/Signup.jsx';
import Login from './login/Login.jsx';

import {
  HashRouter,
  Route,
  Link,
  withRouter
} from "react-router-dom";

var NavBar = (props) => {
/**
 * Renders all the  React HashRouter Navigation Links
 * Not intended to render if the user is not logged in
 *
 * expects no props passed in
 */
    return (
      <HashRouter>
        <div>
              <Link to="/home">Home</Link>
              <Link to="/search">Search</Link>
              <Link to="/createvenue">Create Venue</Link>
              <Link to="/field">Field</Link>
              <Link to="/event">Event</Link>
              <Link to="/venue">Venue</Link>
              <Link to="/createevent">Create Event</Link>
              <Link to="/createfield">Create Field</Link>
          <Route path="/home" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/field" component={Field} />
          <Route path="/event" component={EventView} />
          <Route path="/venue" component={Venue} />
          <Route path="/createevent" component={CreateEvent} />
          <Route path="/createfield" component={CreateField} />
          <Route path="/createvenue" component={CreateVenue} />
        </div>
      </HashRouter>
     );
  }

export default NavBar;