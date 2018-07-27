import React from 'react';
import Calendar from 'react-calendar';

class FieldCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date:''
    }
  }

  onChange(date){
    this.setState({ date })
  }

  render(){
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    )
  }

}

export default FieldCalendar;