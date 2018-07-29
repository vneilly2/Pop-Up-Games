import React from 'react';
import { sportNumConv, blockToTime } from '../../../utils.js'

var EventDetails = (props) => {
  console.log(props.details)
    return(
    <div>
      <div className="event-entry-title">{props.details.eventName}</div>
      <div className="event-entry-date-time">{`Sport: ${sportNumConv(props.details.sportId)}`}</div>
      <div className="event-entry-date-time">
        {
        `${props.details.date} ${blockToTime(props.details.startBlock)} to ${blockToTime(props.details.endBlock)}`
        }
      </div>
    </div>
    )
  }



export default EventDetails;