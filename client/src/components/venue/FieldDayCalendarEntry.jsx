import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description displays information about the entrys intended time
 * @param { Number } props.event.sportID
 * @param { Number } props.event.startBlock
 * @param { Number } props.event.endBlock
 */
var FieldDayCalendarEntry = (props) => (
  <div className="hover-lightblue">{props.event.sportId} {props.event.startBlock} to {props.event.endBlock}</div>
  )

FieldDayCalendarEntry.propTypes = {
  event: PropTypes.object.isRequired,
}

export default FieldDayCalendarEntry;