import React from 'react';
import EventEntry from './EventEntry.jsx';
import { withRouter } from 'react-router-dom';

class FieldCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date:'',
      data: props.data,
    }
    this.changeTarget = props.changeTarget;
  }

  onChange(date){
    this.setState({ date })
  }

  render(){
    return (
      <div>
        <div className="center">
          <button onClick={() => this.props.history.push('/createevent')} >Create Event</button>
        </div>
        <div>
          {
            this.state.data.events.map((event, index) => {
              return <EventEntry data={event} key={index} changeTarget={this.changeTarget} />
            })
          }
        </div>
      </div>
    )
  }

}

export default withRouter(FieldCalendar);