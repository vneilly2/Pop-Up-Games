import React from 'react';
import {withRouter} from "react-router-dom";


class VenueEntry extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      venue: props.venue
    }
    this.changeTarget = props.changeTarget
  }


  render() { 
    return (
    <li>
      <div className="venuelistentry toneone" onClick={() => {
          this.changeTarget({ type: 'venue', id: this.state.venue.id })
          this.props.history.push('venue')} 
      }>
        <span>Name:</span><span>{this.state.venue.venueName}</span><br/><br/>
        <span>Address:</span><span>{this.state.venue.address}</span><br/><br/>
      </div>
    </li>
   )
  }
}

export default withRouter(VenueEntry);
