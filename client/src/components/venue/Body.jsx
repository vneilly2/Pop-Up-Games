import React from 'react';
import VenueInfo from './VenueInfo.jsx';
import FieldList from './FieldList.jsx';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @description Contains the body of the Venue page
 * @param { Object } props.target a obect with keys indicating the most recently accessed of each of the variables
 * @param { Function } props.changeTarget a function bound to App that changes the value of target based on a key value pair passed to it
 */
class VenueBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venueObj: undefined,
      venueId: props.target.venue,
    };
    /**
     * @description function that changes the value of apps target state
     * @example changeTaget({venue: 3}) would change the venue value of target to 3
     * @returns { undefined } undefined
     */
    this.changeTarget = props.changeTarget;
  }
  /**
   * @description when the component first mounts it will get all the information about the venue
   * whose Id it was told to store from the passed in props.target.venue
   */
  componentWillMount() {
    this.getVenueInfo();
  }
  /**
   * @description sends axios request to server
   * takes no params
   * stores the results of the query in this.state.venueObj
   * if the user is not logged in it will send them back to the homepage.
   */
  getVenueInfo() {
    axios
      .get('/api/venue', {
        params: {
          id: this.state.venueId,
        },
      })
      .then(response => {
        this.setState({ venueObj: response.data });
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
   * @description renders the Object and child components
   */
  render() {
    if (this.state.venueObj === undefined) {
      return <div>Loading</div>;
    } else {
      return (
        <div className="venue-body">
          <div className="venue-name">
            {this.state.venueObj.venue.venueName}
            <div>
              <button onClick={() => this.props.history.push('createfield')}>Create New Field</button>
            </div>
          </div>

          <div className="venueinfo">
            <VenueInfo venueinfo={this.state.venueObj.venue.address} />
          </div>

          <div className="fieldlist">
            <FieldList changeTarget={this.changeTarget} fields={this.state.venueObj.fields} />
          </div>
        </div>
      );
    }
  }
}

VenueBody.propTypes = {
  target: PropTypes.object.isRequired,
  changeTarget: PropTypes.func.isRequired,
};

export default withRouter(VenueBody);
