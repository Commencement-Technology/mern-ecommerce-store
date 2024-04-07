const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 400:
      res.json({
        title: "Validation failed",
        errorMsg: error.message,
        stackTrace: error.stack,
      });
      break;
    case 401:
      res.json({
        title: "Unauthorized",
        errorMsg: error.message,
        stackTrace: error.stack,
      });
      break;
    case 403:
      res.json({
        title: "Forbidden",
        errorMsg: error.message,
        stackTrace: error.stack,
      });
      break;
    case 404:
      res.json({
        title: "Not found",
        errorMsg: error.message,
        stackTrace: error.stack,
      });
      break;
    case 500:
      res.json({
        title: "Internal server error",
        errorMsg: error.message,
        stackTrace: error.stack,
      });
      break;
    default:
      break;
  }
};

module.exports = errorHandler;
