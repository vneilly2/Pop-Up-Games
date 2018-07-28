import React from 'react';
import { sportNumConv, blockToTime } from '../../../utils.js'

var EventDetails = (props) => {
    return(
    <div>
      <div className="event-entry-title">{`Event Name: ${sportNumConv(props.details.sportId)}`}</div>
      <div className="event-entry-date-time">
        {
        `Date: ${props.details.date} ${blockToTime(props.details.startBlock)} to ${blockToTime(props.details.endBlock)}`
        }
      </div>
    </div>
    )
  }



export default EventDetails;