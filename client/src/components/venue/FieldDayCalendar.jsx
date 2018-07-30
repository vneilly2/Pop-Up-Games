import React from 'react';
import FieldDayCalendarEntry from './FieldDayCalendarEntry.jsx';
import PropTypes from 'prop-types';

var FieldDayCalendar = props => (
  <div>
    <div className="bold">Today's Events:</div>
    {props.events
      .sort((a, b) => {
        return b.startBlock - a.startBlock;
      })
      .map((event, index) => {
        return <FieldDayCalendarEntry event={event} key={index} />;
      })}
  </div>
);

FieldDayCalendar.propTypes = {
  events: PropTypes.array.isRequired,
};

export default FieldDayCalendar;
