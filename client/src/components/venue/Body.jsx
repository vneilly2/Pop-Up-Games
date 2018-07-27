import React from 'react';
import VenueInfo from './VenueInfo.jsx';
import FieldList from './FieldList.jsx';

var VenueBody = (props) => (
  <div>
    <div className="venueinfo">
      <VenueInfo />
    </div>
    <div className="fieldinfo1">
      <FieldList fields={['listOfFields']}/>
    </div>
    <div className="fieldinfo2">
      <FieldList fields={['listOfFields']}/>
    </div>
    <div className="fieldinfo3">
      <FieldList fields={['listOfFields']}/>
    </div>
    <div className="=fieldinfo4">
      <FieldList fields={['listOfFields']}/>
    </div>
  </div>
  )


export default VenueBody;