import React from 'react';
import Calendar from 'react-calendar';
import EventEntry from './EventEntry.jsx';
import { withRouter } from 'react-router-dom';
class FieldCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date:'',
      data: props.data,
    }
  }

  onChange(date){
    this.setState({ date })
  }

  render(){
    console.log(this.state.data.events)
    return (
      <div>
        <div className="w3-center">
          <button onClick={() => this.props.history.push('/createevent')} >Create Event</button>
        </div>
        {/* <div >
          <Calendar className="fieldcalendar"
            onChange={this.onChange}
            value={this.state.date}
          />
        </div> */}
        <div>
          {
            this.state.data.events.map((event, index) => {
              return <EventEntry data={event} key={index} />
            })
          }
        </div>
      </div>
    )
  }

}

export default withRouter(FieldCalendar);