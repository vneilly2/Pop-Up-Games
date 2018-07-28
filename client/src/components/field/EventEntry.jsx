import React from 'react';
import { sportNumConv, blockToTime } from '../../../utils';
var EventEntry = (props) => {
  console.log(props.data);
  return(<div>
    <div>
      <div>
        {props.data.eventName}
      </div>
      <div>
        {props.data.notes}
      </div>
      <div>
        {sportNumConv(props.data.sportId)} 
      </div>
      <div>
        {'from ' + blockToTime(props.data.startBlock) + ' to ' + blockToTime(props.data.endBlock) }
      </div>
      <div>
        {props.data.date} 
      </div>
    </div>
  </div>)
}

export default EventEntry;