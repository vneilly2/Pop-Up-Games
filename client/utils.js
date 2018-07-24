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

exports.updateState = (event) => {
  console.log(this);
    this.setState({[event.target.name]: event.target.value });
};

exports.handleEnter = (event) => {
    if(event.key === 'Enter') {
      this.processForm();
    }
};