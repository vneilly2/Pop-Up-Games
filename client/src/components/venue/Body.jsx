import React from 'react';
import VenueInfo from './VenueInfo.jsx';
import FieldList from './FieldList.jsx';
import axios from 'axios';
import { withRouter } from 'react-router-dom'


class VenueBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      venueObj: undefined,
      venueId: props.target.id
    }
    this.changeTarget = props.changeTarget
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
    if (this.state.venueObj === undefined) {
      return <div>Loading</div>
    } else {
    return(
      <div className="venue-body">

        <div className="venue-name">
          {this.state.venueObj.venue.venueName}
          <button onClick={() => this.props.history.push('createfield')}>Push Me</button>
        </div>

        <div className="venueinfo">
          <VenueInfo venueinfo={this.state.venueObj.venue.address}/>
        </div>

        <div className="fieldlist">
          <FieldList changeTarget={this.changeTarget} fields={this.state.venueObj.fields}/>
        </div>

      </div>
    )
    }
  }

}

export default withRouter(VenueBody);
