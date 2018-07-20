import React from 'react';
import CreateEvent from './createevent/CreateEvent.jsx';
import CreateField from './createfield/CreateField.jsx';
import CreateVenue from './createvenue/CreateVenue.jsx';
import EventView from './eventview/EventView.jsx';
import Field from './field/Field.jsx';
import Home from './home/Home.jsx';
import Search from './search/Search.jsx';
import Venue from './venue/Venue.jsx';
import Signup from './signup/Signup.jsx';


import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/home">Home</Link>
              <Link to="/field">Field</Link>
              <Link to="/search">Search</Link>
              <Link to="/event">Event</Link>
              <Link to="/venue">Venue</Link>
              <Link to="/createevent">Create Event</Link>
              <Link to="/createfield">Create Field</Link>
              <Link to="/createvenue">Create Venue</Link>
              <Link to="/signup">Signup Form</Link>
            </li>
          </ul>
          <Route path="/home" component={Home} />
          <Route path="/field" component={Field} />
          <Route path="/search" component={Search} />
          <Route path="/event" component={EventView} />
          <Route path="/venue" component={Venue} />
          <Route path="/createevent" component={CreateEvent} />
          <Route path="/createfield" component={CreateField} />
          <Route path="/createvenue" component={CreateVenue} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
     );
  }
}

export default NavBar;