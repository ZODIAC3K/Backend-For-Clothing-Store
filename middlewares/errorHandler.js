const { DEBUG_MODE } = require('../config');
const { CustomErrorHandler } = require('../services');

const errorHandler = (err, req, res, next) => {

  let statusCode = 500;
  let data = {
    message: 'Internal server error',
    ...(DEBUG_MODE  && { originalError: err.message }),
  };

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  if ( statusCode === 500 && DEBUG_MODE )
    console.error(err); 

  res.status(statusCode).json(data);
};

module.exports = errorHandler;
