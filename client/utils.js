
/**
 * @description console.errors all elements in the 
 * array passed into it.
 * @param { Array.<String> } errors - an array of strings containing error messages
 */
exports.errorHandler = (errors) => {
  if (errors.response) {
    console.error('response.data:',errors.response.data);
    console.error('response.status:',errors.response.status);
    console.error('response.headers:',errors.response.headers);
  } else if (errors.request) {
    console.error('errors.request:',errors.request);
  } else {
    console.error('errors.message', errors.message);
  }
  console.error('errors.config:',errors.config);
};


exports.sportNumConv = (num) => {
  if(num  === 1) {
    return 'BasketBall';
  } else if(num  === 2) {
    return 'Soccer';
  } else if(num  === 3) {
    return 'Football';
  } else {
    return 'Quidditch';
  } 
}

exports.blockToTime = (blockNum) => {
  let minutes = blockNum%2 * 30;
  let hour = Math.floor(blockNum/2)
  if ((`${hour}:${minutes}`).length === 3) {
    return `${hour}:${minutes}`+ 0
  } else {
    return `${hour}:${minutes}`
  }
}