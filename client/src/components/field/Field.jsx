import React from 'react';
import FieldCalendar from './FieldCalendar.jsx';
import FieldInfo from './FieldInfo.jsx';
import axios from 'axios';


/**
 * A component to hold the Field Info and Field Calendar components
 */

class Field extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldObj: undefined,
      fieldId: props.target.id
    };
    this.changeTarget = props.changeTarget;
  }

  componentWillMount() {
    this.getFieldData();
  }

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
export default Field;

              // toggleAuth={toggleAuth} 
              // changeTarget={changeTarget} 
              // target={target}