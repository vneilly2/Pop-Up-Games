import React from 'react';
import FieldListEntry from './FieldListEntry.jsx';

var FieldList = (props) => (
    <div>
      <ul>
      {
        props.fields.forEach((field, index) => {
          <FieldListEntry />
        })
      }
      </ul>
    </div>
  )


export default FieldList;