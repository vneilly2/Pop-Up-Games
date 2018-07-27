import React from 'react';
import VenueInfo from './VenueInfo.jsx';
import FieldList from './FieldList.jsx';
import axios from 'axios';


class VenueBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      venueObj: '',
      venueId: props.target.id
    }
  }
  
  componentWillMount(){
    this.getVenueInfo()
  }

  getVenueInfo() {
    axios.get('/api/venue', {
      params: {
        id: this.state.venueId
      }
    }) 
    .then((response) => {
      this.setState({venueObj:response.data})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return(
      <div className="venue-body">

        <div className="venue-name">
          {this.state.venueObj.venueName}
        </div>

        <div className="venueinfo">
          <VenueInfo target={this.state.venueObj.notes}/>
        </div>

        <div className="fieldlist">
          <FieldList changeTarget={props.changeTarget} fields={['field1', 'field2', 'field3']}/>
        </div>

      </div>
    )
  }

}

export default VenueBody;
