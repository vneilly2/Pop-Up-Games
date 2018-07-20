import React from 'react';
import ReactDOM from 'react-dom';
import CreateEvent from './components/createevent/CreateEvent.jsx';
import CreateField from './components/createfield/CreateField.jsx';
import CreateVenue from './components/createvenue/CreateVenue.jsx';
import EventView from './components/eventview/EventView.jsx';
import Field from './components/field/Field.jsx';
import Home from './components/home/Home.jsx';
import Search from './components/search/Search.jsx';
import Venue from './components/venue/Venue.jsx';
import Login from './components/login/Login.jsx';
import LoginStatus from './components/LoginStatus.jsx';
import NavBar from './components/NavBar.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      page: '/home',
      loggedIn: true
    };
  }

  render() {
    if (this.state.loggedIn === true) {
      return (
      <Router>
        <div>
          <LoginStatus />
          <NavBar />
        </div>
      </Router>
      )
    } else {
      return (
            <div>You can't do anything you aren't logged in</div>
        )
    }

  }

}

ReactDOM.render(<App />, document.getElementById('app'));