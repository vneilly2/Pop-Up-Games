import React from 'react';
import FieldListEntry from './FieldListEntry.jsx';
import PropTypes from 'prop-types';
/**
 * @description component use to hold a list of field entries
 * @param { Array } props.fields an array of field objects
 *  
 */
var FieldList = (props) => (
    <div>
      {
        props.fields.map((field, index) => {
         return ( <FieldListEntry data={field} key={index} changeTarget={props.changeTarget}/> )
        })
      }
    </div>
  )

FieldList.propTypes = {
  fields: PropTypes.array.isRequired,
}

export default FieldList;