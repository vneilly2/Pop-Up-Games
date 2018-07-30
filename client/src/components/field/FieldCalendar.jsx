import React from 'react';
import EventEntry from './EventEntry.jsx';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
/**
 * @description The calendar data for the field in question
 */
class FieldCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      data: props.data,
    };
    this.changeTarget = props.changeTarget;
  }

  onChange(date) {
    this.setState({ date });
  }

  render() {
    return (
      <div>
        <div className="center">
          <button onClick={() => this.props.history.push('/createevent')}>Create Event</button>
        </div>
        <div>
          {this.state.data.events
            .sort((a, b) => {
              if (moment(a.date).diff(moment(b.date)) < 0) return -1;
              if (moment(a.date).diff(moment(b.date)) > 0) return 1;
              if (a.startBlock < b.startBlock) return 1;
              else return -1;
            })
            .map((event, index) => {
              return <EventEntry data={event} key={index} changeTarget={this.changeTarget} />;
            })}
        </div>
      </div>
    );
  }
}

FieldCalendar.propTypes = {
  data: PropTypes.object.isRequired,
  changeTarget: PropTypes.func.isRequired,
};

export default withRouter(FieldCalendar);
