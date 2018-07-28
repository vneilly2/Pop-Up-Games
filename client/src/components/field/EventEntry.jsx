import React from 'react';
import { sportNumConv, blockToTime } from '../../../utils';
var EventEntry = (props) => {
  console.log(props.data);
  return(<div className="field-event-entry hover-lightblue">
    <div>
      <div>
        Event Name:{props.data.eventName}
      </div>
      <div>
        Sport: {sportNumConv(props.data.sportId)} 
      </div>
      <div>
       Date: {props.data.date} 
      </div>
      <div>
       Time: {blockToTime(props.data.startBlock) + ' to ' + blockToTime(props.data.endBlock) }
      </div>
      <div>
        Notes: {props.data.notes}
      </div>
    </div>
  </div>)
}

export default EventEntry;