import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import css from 'react-datepicker/dist/react-datepicker.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sport: 'basketball',
      distance: 5,
      date: moment(),
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
        <div className='search-button'>
          <button onClick={this.search.bind(this)}> Search </button>
        </div>
      </div>
    )
  }
}


export default SearchForm;

/*

          <div>
            Start Time
            <DatePicker
              selected={this.state.startTime}
              onChange={this.handleStartTimeChange}
              howTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat="LT"
              timeCaption="Time"
              />
          </div>
          <div>
            End Time
            <DatePicker
              selected={this.state.startTime}
              onChange={this.handleStartTimeChange}
              howTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat="LT"
              timeCaption="Time"
              />
          </div>




                    <div>
            Time
            <TimeRange
              startMoment={this.state.startTime}
              endMoment={this.state.endTime}
              onStartTimeChange={this.handleStartTimeChange(event)}
              onEndTimeChange={this.handleEndTimeChange(event)}
            />
          </div>

*/