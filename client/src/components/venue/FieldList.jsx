import React from 'react';
import FieldListEntry from './FieldListEntry.jsx';

var FieldList = (props) => (
    <div>
      {
        props.fields.map((field, index) => {
         return ( <FieldListEntry data={field} key={index} changeTarget={props.changeTarget}/> )
        })
      }
    </div>
  )


export default FieldList;