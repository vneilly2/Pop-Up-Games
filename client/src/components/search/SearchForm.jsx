import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sport: 'select',
      distance: 'select',
      date: 'select',
      time: 'select'
      //whats the best way to do date/time??
    }
  }

  change(event) {
    this.setState({sport: event.target.value})
  }

  search() {
    this.props.Search(this.state.sport, this.state.distance, this.state.date, this.state.time)
  }


  render() {
    <div className="search-container">
      <h4>Search Form</h4>
        <select class="sport-search-form" onChange={(event) => this.change(event)} value={this.state.value}>
          <option value="basketball">Basketball</option>
          <option value="soccer">Soccer</option>
          <option value="football">Football</option>
          <option value="quidditch">Quidditch</option>
        </select>
        <select class="distance-search-form">
          <option value="5-miles">5 Miles</option>
          <option value="10-miles">10 Miles</option>
          <option value="20-miles">20 Miles</option>
        </select>
        <select class="date-search-form">
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="this-week">This Week</option>
        </select>
        <select class="time-search-form">
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      <div className='search-button'>
        <button onClick={this.search.bind(this)}> Search </button>
      </div>
    </div>
  }
}


export default 'SearchForm';