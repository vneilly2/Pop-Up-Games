import React from 'react';
import EventDetails from './EventDetails.jsx';
import MessageBoard from './MessageBoard.jsx';
import GuestList from './GuestList.jsx';
import axios from 'axios';
import utils from '../../../utils.js';
import FormError from '../FormError.jsx';
import FormField from '../FormField.jsx';

class EventView extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      eventId: props.target.event,
      event: undefined,
      joined: false,
      message:'',
    };
  }

  componentWillMount() {
    this.getEventData();
  }

  getEventData() {
    axios.get('/api/event', {params : {id: this.state.eventId} })
    .then((response) => {
      this.setState({event: response.data })
    })
    .catch((error)=> {
      if (error.response.status == 401 && error.response.data === "user not logged in"){
        this.toggleAuth(false);
      } else {
        utils.errorHander(error);
      }
    })
  }

  joinEvent() {
    let eventId = this.state.eventId
    axios.post('/api/event/guest', { id: eventId })
    .then((response) => {
      this.setState({joined: true })
      this.getEventData();
    })
    .catch((error) => {
      if (error.response.status == 401 && error.response.data === "user not logged in"){
        this.toggleAuth(false);
      } else {
        utils.errorHandler(error);
      }
    })
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
    this.setState({[event.target.name]: event.target.value });
  };

/**
 * @description helper function that updates states of component
 * uses name of input field as state name and value of
 * input field as desired state
 * @param { <Object> } event typical event from html onKeyPress
 * @return { undefined } undefined
 */

  handleEnter(event) {
    if(event.key === 'Enter') {
      this.postMessage();
    }
  }

  postMessage() {
    let eventId = this.state.eventId
    let message = this.state.message
    axios.post('/api/message', {eventId: eventId, body: message })
    .then((response) => {
      this.getEventData();
    })
    .catch((error) => {
      utils.errorHandler(error);
    })
  }

  render() {
    if(this.state.event === undefined) {
      return <div>Loading</div>
    } else {
      return(
        <div className="main event-view-body">
          <div className="eventinfo">
            <EventDetails details={this.state.event.event}/>
            <button type="button" onClick={this.joinEvent.bind(this)} >Join Event</button>
          </div>
          <div className=" messageboard">
            <MessageBoard messages={this.state.event.messages}/>
            <FormField
              txtId={"Message"}
              fieldName={'message'}
              updateState={this.updateState.bind(this)}
              handleEnter={this.handleEnter.bind(this)}
            />
            <button type="button" onClick={this.postMessage.bind(this)} >Post</button>
          </div>
          <div className="guestlist">
            <FormError check={this.state.joined} message={"You have been added to the guest list"} />
            <GuestList  GuestList={this.state.event.guests}/>
          </div>
        </div>)
    }
  }
}




export default EventView;