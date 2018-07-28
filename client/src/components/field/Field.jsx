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
      console.log(error);
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
          <FieldCalendar data={this.state.fieldObj}/>
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