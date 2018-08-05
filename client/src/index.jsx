import React from 'react';
import ReactDOM from 'react-dom';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  Jumbotron,
  Container,
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import SlideDeck from './components/home/carousel.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import Logout from './components/logout/Logout.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import NavBar from './components/NavBar.jsx';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      signupStep: false,
      loginStep: false,
      target: {},
    };
  }
  /**
   * @description changes the value of App.state.loggedIn
   * should be bound before passing to another component
   * @param { Object || false } state the desired state of loggedIn.  False or the profile of logged in user
   * @return { null } nothing
   */
  toggleLogin(state) {
    this.setState({ loggedIn: state, loginStep: false, signupStep: false });
  }
  /**
   * @description changes the value of App.state.signupStep
   * used to determine which components to display when not yet logged in
   * @param { boolean } state the desired state of loggedIn
   * @return { null } nothing
   */
  toggleSignupStep(state) {
    this.setState({ signupStep: state });
  }

  /**
   * @description changes the value of App.state.toggleLoginStep
   * used to determine which components to display when not yet logged in
   * @param { boolean } state the desired state of loggedIn
   * @return { null } nothing
   */
  toggleLoginStep(state) {
    this.setState({ loginStep: state });
  }

  /**
   * @description changes the value of App.state.changeTarget
   * should be bound when passed to other components
   * used to indicate which information to show for which page
   * @example changeTarget({venue: 2}) would update targets venue key to 2
   * @example {venue: 2,  field: 3, event: 5} as the target value would
   * allow for the create field page to create fields for venue 2, or for the field
   * page to display field 3 (all reference are database id reference ids)
   * @param {{String : Number } } target the desired state of loggedIn
   * @return { null } nothing
   */
  changeTarget(target) {
    let oldTarget = this.state.target;
    oldTarget[target.type] = target.id;
    this.setState({ target: oldTarget });
  }

  /**
   * @description renders the body of the App
   * contains conditionally rendered components when not logged in:
   * Sign up & Login
   *
   * and when logged in:
   * Logout
   * As well as a navigation bar as a hash router for all
   * feature supporting components
   */
  render() {
    return (
      <div>
        <Router>
          <div>
            <div style={this.state.loggedIn ? {} : { display: 'none' }}>
              <NavBar
                userInfo={this.state.loggedIn}
                toggleAuth={this.toggleLogin.bind(this)}
                changeTarget={this.changeTarget.bind(this)}
                target={this.state.target}
              />
            </div>
            {/* Top Bar
            Contains links conditionally displayed based on what page you are on for login and signup */}
            <div>
              <Navbar
                color="primary"
                dark
                style={'font-family: Permanent Marker, cursive !important;'}
                light
                expand="md"
                style={this.state.loggedIn || this.state.signupStep ? { display: 'none' } : {}}
              >
                <NavbarBrand href="/">Popup Games</NavbarBrand>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/login"
                      style={this.state.loggedIn || this.state.loginStep ? { display: 'none' } : {}}
                      onClick={() => {
                        this.toggleSignupStep(false);
                        this.toggleLoginStep(true);
                      }}
                    >
                      Log In
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/signup"
                      style={this.state.loggedIn || this.state.signupStep ? { display: 'none' } : {}}
                      onClick={() => {
                        this.toggleSignupStep(true);
                        this.toggleLoginStep(false);
                      }}
                    >
                      Sign Up
                    </NavLink>
                  </NavItem>
                </Nav>
              </Navbar>
            </div>
            <div
              className="row-padding padding-64 container"
              style={this.state.loggedIn || this.state.loginStep || this.state.signupStep ? { display: 'none' } : {}}
            >
              <div id="slidedeck">
                <SlideDeck fluid />
              </div>
              <div>
                <Jumbotron fluid style={this.state.loggedIn || this.state.signupStep ? { display: 'none' } : {}}>
                  <Container fluid>
                    <h1 className="display-3">Welcome to </h1>
                    <p className="lead">
                      This is a modified jumbotron that occupies the entire horizontal space of its parent.
                    </p>
                  </Container>
                </Jumbotron>
              </div>

              <div className="content">
                <div className="twothird">
                  <h1>What We Do</h1>
                  <h5 className="padding-32 text-grey">
                    We here love sports and we want to make it fun and easy to find sport games in your local area. Use
                    our site to find and join games near you. Or go on and create your own! Go out and have fun!
                  </h5>
                </div>

                <div className="third center">
                  <img src="./img/basketballcartoon.png" height="200" />
                </div>
              </div>
            </div>

            {/*Quote Section */}
            <div
              className=" container center-quote"
              style={this.state.loggedIn || this.state.loginStep || this.state.signupStep ? { display: 'none' } : {}}
            >
              <div className="content padding">
                <h1 className="margin large">"Just play. Have fun. Enjoy the game." -Michael Jordan</h1>
              </div>
            </div>

            {/* Footer */}
            <div>
              <CardGroup
                style={this.state.loggedIn || this.state.loginStep || this.state.signupStep ? { display: 'none' } : {}}
              >
                <Card>
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>
                      This is a wider card with supporting text below as a natural lead-in to additional content. This
                      content is a little bit longer.
                    </CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>
                      This is a wider card with supporting text below as a natural lead-in to additional content. This
                      card has even longer content than the first to show that equal height action.
                    </CardText>
                  </CardBody>
                </Card>
              </CardGroup>
            </div>
            <div
              style={this.state.loggedIn || this.state.loginStep || this.state.signupStep ? { display: 'none' } : {}}
            >
              <footer>
                <Row>
                  <Col sm="12" md="12" lg="12">
                    <p className="align-self-center">
                      &copy; 2017. Отдел разработки и администрирования ООО "Сбербанк-Сервис"
                    </p>
                  </Col>
                </Row>
              </footer>
            </div>

            <Route
              path="/login"
              render={props => (
                <Login loggedIn={this.state.loggedIn} toggleAuth={this.toggleLogin.bind(this)} {...props} />
              )}
            />
            <Route path="/signup" render={props => <Signup />} />
            <Route path="/logout" render={props => <Logout toggleAuth={this.toggleLogin.bind(this)} {...props} />} />
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
