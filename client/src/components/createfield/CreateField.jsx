import React from 'react';
import CreateFieldForm from './CreateFieldForm.jsx';

/**
 * Function Component to hold the create field form
 * expects no props to be passed in
 */
var CreateField = (props) => (
  <div className="main">
    <h1>This is the create field page</h1>
    <CreateFieldForm />
  </div>
  )

export default CreateField;