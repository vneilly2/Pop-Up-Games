import React from 'react';
import VenueInfo from './VenueInfo.jsx';
import FieldList from './FieldList.jsx';

var VenueBody = (props) => (
  <div>
    <VenueInfo />
    <FieldList fields={['listOfFields']}/>
  </div>
  )


export default VenueBody;