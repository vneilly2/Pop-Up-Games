import React from 'react';
import VenueInfo from './VenueInfo.jsx';
import FieldList from './FieldList.jsx';

var VenueBody = (props) => (
  <div className="venue-body">

    <div className="venue-name">
      Brooklyn Bridge Park
    </div>

    <div className="venueinfo">
      <VenueInfo />
    </div>

    <div className="fieldlist">
      <FieldList fields={['field1', 'field2', 'field3']}/>
    </div>

  </div>
  )


export default VenueBody;

/* implementation w/ three columns for fields 

  <div className="main venue-body">

    <div className="venue-name">
      Brooklyn Bridge Park
    </div>

    <div className="venueinfo">
      <VenueInfo />
    </div>

    <div>
      <FieldList fields={['field1']}/>
    </div>

    <div>
      <FieldList fields={['field1']}/>
    </div>

    <div>
      <FieldList fields={['field1']}/>
    </div>

  </div>

*/