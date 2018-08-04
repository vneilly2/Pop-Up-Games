import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import CreateEvent from './createevent/CreateEvent.jsx';
import CreateField from './createfield/CreateField.jsx';
import CreateVenue from './createvenue/CreateVenue.jsx';
import EventView from './eventview/EventView.jsx';
import Field from './field/Field.jsx';
import Home from './home/Home.jsx';
import Search from './search/Search.jsx';
import Venue from './venue/Venue.jsx';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
/**
 * @description Renders all the  React Router Navigation Links
 */
var NavBar = props => {
  // todo: variable used to pass values to routes, not sure why it was nesseary.  Couldnt seem to access props from inside route render
  // todo:  refactor so that these variables aren't used and the routes access them directly through props
  let userInfo = props.userInfo;
  let toggleAuth = props.toggleAuth;
  let changeTarget = props.changeTarget;
  let target = props.target;
  return (
    <div>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">Popup Games</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/home">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/createvenue">
              Create Venue
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/logout">
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <Route
        path="/home"
        render={props => <Home toggleAuth={toggleAuth} userInfo={userInfo} changeTarget={changeTarget} {...props} />}
      />
      <Route
        path="/field"
        render={props => <Field toggleAuth={toggleAuth} changeTarget={changeTarget} target={target} {...props} />}
      />
      <Route
        path="/event"
        render={props => <EventView toggleAuth={toggleAuth} changeTarget={changeTarget} target={target} {...props} />}
      />
      <Route
        path="/venue"
        render={props => <Venue toggleAuth={toggleAuth} changeTarget={changeTarget} target={target} {...props} />}
      />
      <Route
        path="/createevent"
        render={props => <CreateEvent toggleAuth={toggleAuth} changeTarget={changeTarget} target={target} {...props} />}
      />
      <Route
        path="/createfield"
        render={props => <CreateField toggleAuth={toggleAuth} changeTarget={changeTarget} target={target} {...props} />}
      />
      <Route path="/createvenue" render={props => <CreateVenue toggleAuth={toggleAuth} target={target} {...props} />} />
    </div>
  );
};

export default NavBar;
