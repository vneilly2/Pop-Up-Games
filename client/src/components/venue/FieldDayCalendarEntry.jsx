import React from 'react';
import PropTypes from 'prop-types';
import { blockToTime, sportNumConv } from '../../../utils.js';
/**
 * @description displays information about the entrys intended time
 * @param { Number } props.event.sportID
 * @param { Number } props.event.startBlock
 * @param { Number } props.event.endBlock
 */
var FieldDayCalendarEntry = props => (
  <div className="hover-lightblue">
    {sportNumConv(props.event.sportId)} {blockToTime(props.event.startBlock)} to {blockToTime(props.event.endBlock)}
  </div>
);

FieldDayCalendarEntry.propTypes = {
  event: PropTypes.object.isRequired,
};

export default FieldDayCalendarEntry;
