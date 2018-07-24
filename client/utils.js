
/**
 * Error handling utility function that iterates over
 * an error return from a get or a post request and
 * then console logs it.
 */
exports.errorHandler = (error) => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
};