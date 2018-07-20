import React from 'react';
import TimeRangePicker from 'react-time-range-picker';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import css from 'react-datepicker/dist/react-datepicker.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sport: 'select',
      distance: 'select',
      date: moment(),
      time: 'select'
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  change(event) {
    this.setState({sport: event.target.value})
  }

  handleDateChange(date) {
    this.setState({
      date: date
    });
  }

  search() {
    this.props.Search(this.state.sport, this.state.distance, this.state.date, this.state.time)
  }

  pickerupdate(start_time, end_time) {
    // start and end time in 24hour time
    console.log(`start time: ${start_time}, end time: ${end_time}`)
  }


  render() {
    return (
      <div className="search-container">
        <h4>Search Form</h4>
          <select className="sport-search-form" onChange={(event) => this.change(event)} value={this.state.value}>
            <option value="basketball">Basketball</option>
            <option value="soccer">Soccer</option>
            <option value="football">Football</option>
            <option value="quidditch">Quidditch</option>
          </select>
          <select className="distance-search-form">
            <option value="5-miles">5 Miles</option>
            <option value="10-miles">10 Miles</option>
            <option value="20-miles">20 Miles</option>
          </select>
          <div>
            <DatePicker
              selected = {this.state.startDate}
              onChange = {this.handleDateChange}
            />
          </div>
          <div>
            <TimeRangePicker hourmarkers hourlines timeupdate={this.pickerupdate}/>
          </div>
        <div className='search-button'>
          <button onClick={this.search.bind(this)}> Search </button>
        </div>
      </div>
    )
  }
}


export default SearchForm;

/*
          <select class="date-search-form">
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this-week">This Week</option>


          </select>

*/