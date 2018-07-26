import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import css from 'react-datepicker/dist/react-datepicker.css';
import SearchResults from './SearchResults.jsx'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sport: 'basketball',
      distance: 5,
      date: moment(),
      searchResults: [] 
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  updateState(event) {
    this.setState({[event.target.name]: event.target.value });
  }

  handleDateChange(date) {
    this.setState({date: date});
  }

  searchEvents(params) {
    axios.get( '/signup', params, {
      headers: {
      }
    })
    .catch((error) => {
      utils.errorHandler(error);
    })
    .then((response) => {
      console.log('Here are your search results')});
      this.setState({events:[]})
  };

  render() {
    return (
      <div className="search-container">
          <select className="sport-search-form" onChange={(event) => this.updateState(event)} value={this.state.value} name="sport">
            <option >Sport</option>
            <option value="basketball">Basketball</option>
            <option value="soccer">Soccer</option>
            <option value="football">Football</option>
            <option value="quidditch">Quidditch</option>
          </select>
          <select className="distance-search-form" onChange={(event) => this.updateState(event)} name="distance" >
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
          <button onClick={this.searchEvents.bind(this)}> Search </button>
        </div>
        <div>
          <SearchResults searchResults={['exampleSearchResult']}/>
        </div> 
      </div>
    )
  }
}


export default SearchForm;

