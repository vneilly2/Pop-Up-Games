import React from 'react';
import TimeRangePicker from 'react-time-range-picker';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import utils from '../../../utils.js';
/**
 * A form for creating new events and saving them to the database
 */

class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: undefined,
      startBlock: undefined,
      endBlock: undefined,
      target: props.target,
      timeConflict: false,
      eventName: '',
      notes: '',
      sportId: undefined,
      fieldId: props.target.field,
      formError: false,
      //minPlayer
      //maxPlayer
      eventTooEarly: false,
    };
    this.toggleAuth = props.toggleAuth;
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  /**
   * @description helper function that updates states of component
   * uses name of input field as state name and value of
   * input field as desired state
   * @param { <Object> } event typical event from html onChange
   * @example
   * <input type={text}
   * name={targetName}
   * value={targetValue}
   * onChange={this.updateState}
   * />
   * ...
   * this.setState({targetName: targetValue})
   * @return { undefined } undefined
   */

  updateState(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description helper function that updates states of component
   * uses name of input field as state name and value of
   * input field as desired state
   * @param { <Object> } event typical event from html onKeyPress
   * @return { undefined } undefined
   */
  handleEnter(event) {
    if (event.key === 'Enter') {
      this.processForm();
    }
  }
  /**
   * helper function that updates date state to date selected in calendar
   *
   *
   */

  handleDateChange(date) {
    this.setState({ date: date });
  }

  componentWillMount() {
    // could theoretically get a dynamic list of sports
  }

  processForm() {
    this.state.formError = false;
    if (
      this.state.sportId === undefined ||
      this.state.date === undefined ||
      this.state.startBlock === undefined ||
      this.state.endBlock === undefined ||
      this.state.eventName === '' ||
      this.state.notes === ''
    ) {
      this.setState({ formError: true });
    } else if (this.state.date.diff(moment().format('MM/DD/YYYY')) < 0) {
      this.setState({ eventTooEarly: true });
    } else {
      let params = {
        eventName: this.state.eventName,
        startBlock: this.calcBlock(this.state.startBlock),
        endBlock: this.calcBlock(this.state.endBlock),
        notes: this.state.notes,
        date: this.state.date.format('MM/DD/YYYY'),
        // minPlayer,
        // maxPlayer,
        sportId: this.state.sportId,
        fieldId: this.state.fieldId,
      };
      this.createEvent(params);
    }
  }
  calcBlock(time) {
    let hour = time.format('k');
    let minutes = time.format('m');
    return hour * 2 + minutes / 30;
  }
  /**
   * Takes a set of parameters as values in an object
   * and executes a post request to the /event endpoint on the server
   * If successful it will redirect the user to the new Event page
   * If it fails it will evaluate the error message to indicate
   * which aspect of the post failed
   * @event error.response.status === 401 && error.response.data === "user not logged in"
   * will send them back to the homepage.
   */

  createEvent(params) {
    axios
      .post('/api/event', params, {
        headers: {},
      })
      .then(response => {
        this.props.history.push('/field');
      })
      .catch(error => {
        if (error.response.status == 401 && error.response.data === 'user not logged in') {
          this.toggleAuth(false);
        } else if (error.response.status == 400) {
          // todo this error should be refactored on server to not be a general error but an error specific to time conflicts
          this.setState({ timeConflict: true });
        } else {
          utils.errorHandler(error);
        }
      });
  }

  /**
   * updates start time and end time state to times selected in time picker
   * */

  pickerUpdate(start_time, end_time) {
    // start and end time in 24hour time
    this.setState({ startBlock: moment(start_time, 'HH:mm'), endBlock: moment(end_time, 'HH:mm') });
  }

  render() {
    return (
      <div className="search-container">
        <h2 className="center">Create Event</h2>
        <h4 className="center">Please fill out below details for your event.</h4>
        <div className="create-event-form">
          <div className="createeventdetailsgrid">
            <FormError check={this.state.formError} message={'*All fields are required'} />
            <div>Event Name:</div>
            <FormField
              txtId={'Event Name'}
              fieldName={'eventName'}
              updateState={this.updateState.bind(this)}
              handleEnter={this.handleEnter.bind(this)}
            />
            <div>Notes:</div>
            <FormField
              txtId={'Notes'}
              fieldName={'notes'}
              updateState={this.updateState.bind(this)}
              handleEnter={this.handleEnter.bind(this)}
            />
            {/* Check Boxes Here */}
            <div>Sport</div>
            <select
              className="sport-search-form"
              onChange={event => this.updateState(event)}
              value={this.state.value}
              name="sportId"
            >
              <option value={undefined}>Select Sport</option>
              <option value="1">Basketball</option>
              <option value="2">Soccer</option>
              <option value="3">Football</option>
              <option value="4">Quidditch</option>
            </select>
            <FormError check={this.state.eventTooEarly} message={'*Date must be in the future'} />
            <FormError check={this.state.timeConflict} message={'*There is already an event scheduled for this time'} />
            <div>
              Date:
              <DatePicker selected={this.state.date} onChange={this.handleDateChange} />
            </div>
          </div>
          <div className="timepickergrid">
            <TimeRangePicker hourmarkers hourlines timeupdate={this.pickerUpdate.bind(this)} />
          </div>
        </div>

        <div className="search-button">
          <button type="button" onClick={() => this.processForm()}>
            {' '}
            Create{' '}
          </button>
        </div>
      </div>
    );
  }
}

CreateEventForm.propTypes = {
  target: PropTypes.object.isRequired,
  toggleAuth: PropTypes.func.isRequired,
};

export default withRouter(CreateEventForm);
