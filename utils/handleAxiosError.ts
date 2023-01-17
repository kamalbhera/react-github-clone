/* This axios handler is written according to the axios documentation
available at https://axios-http.com/docs/handling_errors */

import axios from 'axios';

// - - - -

const handleAxiosError = (error: any) => {
  if (!axios.isAxiosError(error)) {
    throw error;
  }

  // We know that it is axios error instance
  // 1. Request was made, server responded with error status (400, 401, 403, 500, ...)
  if (error.response) {
    console.log('err resp data: ', error.response.data);
    console.log('err resp status: ', error.response.status);
    console.log('err resp headers: ', error.response.headers);
  }
  // 2. Request was made, no response from server received
  else if (error.request) {
    console.log('err request: ', error.request);
  }
  // 3. Error while setting up the request which triggered an Error
  else {
    console.log('err message: ', error.message);
  }

  // Config which was set for axios!
  console.log('config: ', error.config);
};

export default handleAxiosError;
