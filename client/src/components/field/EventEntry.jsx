import React from 'react';
import { sportNumConv, blockToTime, sportPicture } from '../../../utils';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
/**
 * todo I think this component could be stateless but the withRouter as I understand it only works with stateful components
 * @description Component that renders a single event entry
 */
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
    };
    this.changeTarget = props.changeTarget;
  }
  render() {
    return (
      <div
        className="field-event-entry hover-lightblue"
        onClick={() => {
          this.changeTarget({ type: 'event', id: this.state.id });
          this.props.history.push('/event');
        }}
      >
        <div className="sporticon">
          <img src={sportPicture(this.state.sportId)} width="150" />
        </div>
        <div className="fieldeventinfo">
          <div>Event Name:{this.state.eventName}</div>
          <div>Sport: {sportNumConv(this.state.sportId)}</div>
          <div>Date: {moment(this.state.date).format('LL')}</div>
          <div>Time: {blockToTime(this.state.startBlock) + ' to ' + blockToTime(this.state.endBlock)}</div>
          <div>Notes: {this.state.notes}</div>
        </div>
      </div>
    );
  }
}

EventEntry.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withRouter(EventEntry);
