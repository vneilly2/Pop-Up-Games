import React from 'react';
import FieldBasicDetails from './FieldBasicDetails.jsx';
import FieldDayCalendar from './FieldDayCalendar.jsx';
import {withRouter} from "react-router-dom";

class FieldListEntry extends React.Component {
  constructor(props){
    super(props)
    this.state={
      fieldData: props.data //field id, field details, fieldtodaysevents
    }
    this.changeTarget = props.changeTarget
  }

  render() {
    return (
      <div className="indivfield" onClick={() => {
        this.changeTarget({ type: 'field', id: this.state.fieldData.id })
        this.props.history.push('/field')} } 
      >
        <FieldBasicDetails data={this.state.fieldData} className="field-basic-details"/>
        <FieldDayCalendar events={this.state.fieldData.todaysEvents} className="field-todays-events" todaysEvents={this.state.fieldData}/>
      </div>
    )
  }
  
}

export default withRouter(FieldListEntry);

