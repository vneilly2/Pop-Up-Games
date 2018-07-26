
/**
 * @description console.errors all elements in the 
 * array passed into it.
 * @param { Array.<String> } errors - an array of strings containing error messages
 */
exports.errorHandler = (errors) => {
  if (errors.response) {
    console.error('Data:',errors.response.data);
    console.error('Status:',errors.response.status);
    console.error('Header:',errors.response.headers);
  } else if (error.request) {
    console.error('Request:',errors.request);
  } else {
    console.error('Error', errors.message);
  }
  console.error('Config:',errors.config);
};