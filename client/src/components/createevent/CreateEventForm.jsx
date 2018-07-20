import React from 'react';
import TimeRangePicker from 'react-time-range-picker';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import css from 'react-datepicker/dist/react-datepicker.css';

class CreateEventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sport: 'basketball',
      distance: 5,
      date: moment(),
      startTime: moment(),
      endTime: moment(),
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSportChange = this.handleSportChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
  }

  handleSportChange(event) {
    this.setState({sport: event.target.value})
  }

  handleDateChange(date) {
    this.setState({
      date: date
    });
  }

  handleDistanceChange(event) {
    this.setState({distance: event.target.value})
  }

  search() {
    this.props.Search(this.state.sport, this.state.distance, this.state.date, this.state.time)
  }

  pickerUpdate(start_time, end_time) {
    // start and end time in 24hour time
    console.log(`start time: ${start_time}, end time: ${end_time}`)
    this.setState({startTime: moment(start_time, "HH:mm").hour(Number)*2, endTime: moment(end_time, "HH:mm").hour(Number)*2})
  }

  render() {
    return (
      <div className="search-container">
        <h4>Search Form</h4>
          <select className="sport-search-form" onChange={(event) => this.handleSportChange(event)} value={this.state.value}>
            <option >Sport</option>
            <option value="basketball">Basketball</option>
            <option value="soccer">Soccer</option>
            <option value="football">Football</option>
            <option value="quidditch">Quidditch</option>
          </select>
          <select className="distance-search-form" onChange={(event) => this.handleDistanceChange(event)} >
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
          <button onClick={this.search.bind(this)}> Search </button>
        </div>
      </div>
    )
  }

}


export default CreateEventForm;