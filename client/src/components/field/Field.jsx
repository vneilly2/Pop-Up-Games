import React from 'react';
import FieldCalendar from './FieldCalendar.jsx';
import FieldInfo from './FieldInfo.jsx';
import axios from 'axios';
import PropTypes from 'prop-types';

/**
 * @description A component to hold the Field Info and Field Calendar components
 */
class Field extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldObj: undefined,
      fieldId: props.target.field
    };
    this.changeTarget = props.changeTarget;
  }
  /**
   * @description get the field data when the componenet mounts
   */
  componentWillMount() {
    this.getFieldData();
  }
  /**
   * @description gets the field data specified by the props.target value of field
   * if the user is not logged in it will send them back to the homepage.
   */
  getFieldData() {
    axios.get('/api/field', {
      params: {
        id: this.state.fieldId
      }
    }) 
    .then((response) => {
      this.setState({fieldObj: response.data})
    })
    .catch((error) => {
      if (error.response.status == 401 && error.response.data === "user not logged in"){
        this.toggleAuth(false);
      } else {
        console.log(error);
      }
    })
  }
  render() {
    if(this.state.fieldObj === undefined) {
      return (<div>Loading</div>)
    } else {
      return (<div className="main field-body">
        <div className='fieldinfo'>
          <FieldInfo data={this.state.fieldObj.field} />
        </div>
        <div className="fieldcalendar">
          <FieldCalendar data={this.state.fieldObj} changeTarget={this.changeTarget} />
        </div>
      </div>
      )
    }
  }
}

Field.propTypes = {
  target: PropTypes.object.isRequired,
  changeTarget: PropTypes.func.isRequired,
}

export default Field;