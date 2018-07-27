import React from 'react';
import TimeRangePicker from 'react-time-range-picker';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import css from 'react-datepicker/dist/react-datepicker.css';
import FormError from '../FormError.jsx';

/**
 * A form for creating new events and saving them to the database
 */

class CreateEventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sport: 'basketball',
      distance: '5', //value always string, needs to be converted
      date: moment(),
      startTime: moment(),
      endTime: moment(),
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }

/**
 * helper function that updates states of component
 * uses name of input field as state name and value of
 * input field as desired state
 *
 * example :
 * <input type={text} name={name} onChange={this.updateState}
 * would update the state `name` to value of text in input an any changes
 * to the field
 */

  updateState(event) {
    this.setState({[event.target.name]: event.target.value });
  }

/**
 * helper function that updates date state to date selected in calendar
 * */

  handleDateChange(date){
    this.setState({date: date })
  }

/**
 * Takes a set of parameters as values in an object
 * and executes a post request to the /event endpoint on the server
 * If successful it will redirect the user to the new Event page
 * If it fails it will evaluate the error message to indicate
 * which aspect of the post failed
 */  

  createEvent(params) {
    axios.post( '/api/event', params, {
      headers: {
      }
    })
    .catch((error) => {
      utils.errorHandler(error);
    })
    .then((response) => {
      console.log('Event has been created')});
  };

/**
 * updates start time and end time state to times selected in time picker
 * */

  pickerUpdate(start_time, end_time) {
    // start and end time in 24hour time
    console.log(`start time: ${start_time}, end time: ${end_time}`)
    this.setState({startTime: moment(start_time, "HH:mm").hour(Number)*2, endTime: moment(end_time, "HH:mm").hour(Number)*2})
  }

  render() {
    return (
      <div className="search-container">
        <h4>Create Event Form</h4>
          <select className="sport-search-form" onChange={(event) => this.updateState(event)} value={this.state.value} name='sport'>
            <option >Sport</option>
            <option value="basketball">Basketball</option>
            <option value="soccer">Soccer</option>
            <option value="football">Football</option>
            <option value="quidditch">Quidditch</option>
          </select>
          <select className="distance-search-form" onChange={(event) => this.updateState(event)} name='distance'>
            <option >Distance</option>
            <option value={5}>5 Miles</option>
            <option value={10}>10 Miles</option>
            <option value={20}>20 Miles</option>
          </select>
          <div>
            Date
            <DatePicker
              selected = {this.state.date}
              onChange = {this.handleDateChange}
            />
          </div>
          <div>
            <TimeRangePicker hourmarkers hourlines timeupdate={this.pickerUpdate.bind(this)} />
          </div>

        <div className='search-button'>
          <button onClick={this.createEvent.bind(this)}> Create </button>
        </div>
      </div>
    )
  }

}


export default CreateEventForm;