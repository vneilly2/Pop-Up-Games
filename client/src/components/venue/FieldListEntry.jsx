import React from 'react';
import FieldBasicDetails from './FieldBasicDetails.jsx';
import FieldDayCalendar from './FieldDayCalendar.jsx';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * todo: I kinda think this could have been a stateless component
 * @description Component that holds all the data about an individual field entry
 * @param { Object } props.data object containing all the info about a single field
 */
class FieldListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldData: props.data, //field id, field details, fieldtodaysevents
    };
    this.changeTarget = props.changeTarget;
  }

  render() {
    return (
      <div
        className="indivfield hover-lightblue"
        onClick={() => {
          this.changeTarget({ type: 'field', id: this.state.fieldData.id });
          this.props.history.push('/field');
        }}
      >
        <FieldBasicDetails data={this.state.fieldData} className="field-basic-details" />
        <FieldDayCalendar
          events={this.state.fieldData.todaysEvents}
          className="field-todays-events"
          todaysEvents={this.state.fieldData}
        />
      </div>
    );
  }
}
FieldListEntry.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withRouter(FieldListEntry);
