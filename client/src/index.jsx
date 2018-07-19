import React from 'react';
import ReactDOM from 'react-dom';
import CreateEvent from './components/createevent/CreateEvent.jsx';
import EventView from './components/eventview/EventView.jsx';
import Field from './components/field/Field.jsx';
import Home from './components/home/Home.jsx';
import Search from './components/search/Search.jsx';
import Venue from './components/venue/Venue.jsx';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 'basic'};
  }
  changeState(event, state) {
    event.stopPropagation()
    this.setState({page: state});
    console.log(this.state.page);
  }
  render() {
    if(this.state.page ==='basic') {
    return (
      <div>
        <div>
          <a>Dev Tools Temp Links</a><br/>
          <button onClick ={() => this.setState({page:'search'})}>Search</button><br/>
          <button onClick ={() => this.setState({page:'eventview'})}>Event View</button><br/>
          <button onClick ={() => this.setState({page:'field'})}>Field</button><br/>
          <button onClick ={() => this.setState({page:'home'})}>Home</button><br/>
          <button onClick ={() => this.setState({page:'venue'})}>Venue</button><br/>
          <button onClick ={() => this.setState({page:'createevent'})}>Create Event</button><br/>
        </div>
      </div>);
    } else if (this.state.page ==='search') {
      return (<Search />);
    } else if (this.state.page ==='eventview') {
      return (<EventView />);
    } else if (this.state.page ==='field') {
      return (<Field />);
    } else if (this.state.page ==='home') {
      return (<Home />);
    } else if (this.state.page ==='venue') {
      return (<Venue />);
    } else if (this.state.page ==='createevent') {
      return (<CreateEvent />);
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// if(this.state.page ='') {
//     return (
//       <div>
//         <span>Hello World</span>
//         <div>
//           <a>Dev Tools Temp Links</a>
//           <a href='' onClick ={() => this.setState({'page':'search'})}>Search</a>
//           <a href='' onClick ={() => this.setState({'page':'eventview'})}>Event View</a>
//           <a href='' onClick ={() => this.setState({'page':'field'})}>Field</a>
//           <a href='' onClick ={() => this.setState({'page':'home'})}>Home</a>
//           <a href='' onClick ={() => this.setState({'page':'venue'})}>Venue</a>
//           <a href='' onClick ={() => this.setState({'page':'createevent'})}>Create Event</a>
//         </div>
//       </div>);
//     } else if (this.state.page ='search') {
//       return (<Search />);
//     } else if (this.state.page ='eventview') {
//       return (<EventView />);
//     } else if (this.state.page ='field') {
//       return (<Field />);
//     } else if (this.state.page ='home') {
//       return (<Home />);
//     } else if (this.state.page ='venue') {
//       return (<Venue />);
//     } else if (this.state.page ='createevent') {
//       return (<CreateEvent />);
//     }
