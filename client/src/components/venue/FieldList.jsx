import React from 'react';
import FieldListEntry from './FieldListEntry.jsx';

var FieldList = (props) => (
    <div>
      {
        props.fields.map((field, index) => {
         return ( <FieldListEntry key={index}/> )
        })
      }
    </div>
  )


export default FieldList;