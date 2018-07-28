import React from 'react';
import { sportNumConv, blockToTime } from '../../../utils';
import { withRouter } from 'react-router-dom';

class EventEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      eventName: props.data.eventName,
      sportId: props.data.sportId,
      date: props.data.date,
      startBlock: props.data.startBlock,
      endBlock: props.data.endBlock,
      notes: props.data.notes,
    }
    this.changeTarget = props.changeTarget;
  }
  render() {
    return(<div className="field-event-entry hover-lightblue" 
      onClick={() => {
        this.changeTarget({type: 'event', id: this.state.id})
        this.props.history.push('/event')
      }}>
      <div>
        <div>
          Event Name:{this.state.eventName}
        </div>
        <div>
          Sport: {sportNumConv(this.state.sportId)} 
        </div>
        <div>
        Date: {this.state.date} 
        </div>
        <div>
        Time: {blockToTime(this.state.startBlock) + ' to ' + blockToTime(this.state.endBlock) }
        </div>
        <div>
          Notes: {this.state.notes}
        </div>
      </div>
    </div>)
  }
}

export default withRouter(EventEntry);