import React from 'react';
import CreateEvent from './createevent/CreateEvent.jsx';
import EventView from './eventview/EventView.jsx';
import Field from './field/Field.jsx';
import Home from './home/Home.jsx';
import Search from './search/Search.jsx';
import Venue from './venue/Venue.jsx';
import {
  BrowserRouter as Router,
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
              <Link to="/field">Field</Link>
              <Link to="/home">Home</Link>
              <Link to="/search">Search</Link>
              <Link to="/event">Event</Link>
              <Link to="/venue">Venue</Link>
              <Link to="/createevent">Create</Link>
            </li>
          </ul>
          <Route path="/field" component={Field} />
          <Route path="/home" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/event" component={EventView} />
          <Route path="/venue" component={Venue} />
          <Route path="/createevent" component={CreateEvent} />
        </div>
      </Router>
     );
  }
}

export default NavBar;