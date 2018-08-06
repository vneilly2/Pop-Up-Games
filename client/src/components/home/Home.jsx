import React from 'react';
import GMap from './GMap.jsx';
import PropTypes from 'prop-types';
import VenueList from './VenueList.jsx';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';

/**
 * @description gets the users account data, then gets nearby venues
 * and plots them on a map, also outputs a list of venues to the right of the map
 * @param toggleAuth function that is bound to parent that changes the state of loggedIn to arg[0]
 * @param userInfo object containing data on the user
 */

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.userInfo,
      position: { lat: props.userInfo.lat, lng: props.userInfo.lng, address: props.userInfo.address },
      nearbyVenues: [],
    };
    this.changeTarget = props.changeTarget;
  }
  /**
   * @description Executes a get request to the venues endpoint to get all the venues in range to display on the map
   * if the user is not logged in it will send them back to the homepage.
   */
  componentWillMount() {
    axios
      .get('/api/venues')
      .then(response => {
        this.setState({ nearbyVenues: response.data });
      })
      .catch(error => {
        if (error.response.status == 401 && error.response.data === 'user not logged in') {
          this.toggleAuth(false);
        } else {
          console.log(error);
        }
      });
  }

  /**
   * @description takes the nearby venues and the user data and generates a map centered on the users home with nearby
   * points plotted around it
   */
  render() {
    if (this.state.position === undefined) {
      return (
        <div>
          <h1>Homepage</h1>
          <h2>Loading</h2>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="venuemap">
            {/**
             * A WARNING FOR ALL YE WHO ENTER HERE.  THE google-maps-react docs are poorly written and
             * it was not fun to set this up.  Unless you wish to have first hand experience understanding why
             * people should document code they upload for others to use I would avoid messing with the GMap component
             */}
            <GMap position={this.state.position} venues={this.state.nearbyVenues} />
          </div>
          <div>
            <div className='userAddressForm'>

            </div>
            {this.state.position !== undefined &&
              <div className="venuecolumn">
                <VenueList changeTarget={this.changeTarget} venues={this.state.nearbyVenues} />
              </div>
            }
          </div>
          <div class="homefooter">
            <footer id="home-footer">
              <Row>
                <Col sm="12" md="12" lg="12">
                  <p className="align-self-center">
                    &copy; 2017. Отдел разработки и администрирования ООО "Сбербанк-Сервис"
                  </p>
                </Col>
              </Row>
            </footer>
          </div>
        </div>
      );
    }
  }
}

Home.propTypes = {
  userInfo: PropTypes.object.isRequired,
  toggleAuth: PropTypes.func.isRequired,
};
export default withRouter(Home);
