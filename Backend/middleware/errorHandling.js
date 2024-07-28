const { constantErrors } = require('../constantErrors');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  
  switch (statusCode) {
    case constantErrors.Bad_Request:
      res.status(400).json({
        title: "Bad Request",
        message: err.message,
        stackTree: err.stack,
      });
      break;
    case constantErrors.Unauthorized:
      res.status(401).json({
        title: "Unauthorized",
        message: err.message,
        stackTree: err.stack,
      });
      break;
    case constantErrors.Not_Found:
      res.status(404).json({
        title: "Not Found",
        message: err.message,
        stackTree: err.stack,
      });
      break;
    case constantErrors.Server_Error:
      res.status(500).json({
        title: "Service Error",
        message: err.message,
        stackTree: err.stack,
      });
      break;
    case constantErrors.Service_Unavailable:
      res.status(503).json({
        title: "Service Unavailable",
        message: err.message,
        stackTree: err.stack,
      });
      break;
    default:
      res.status(500).json({
        title: "Unknown Error",
        message: err.message,
        stackTree: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;