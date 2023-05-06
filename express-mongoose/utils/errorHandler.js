const NotFoundError = (req, res, next) => {
  return res.status(404).json({
    statusCode: res.statusCode,
    error: {
      type: "NotFound",
      message: `Not Found ${req.url} route.`,
    },
  });
};

const ErrorHandler = (err, req, res, next) => {
  return res.json({
    statusCode: res.status | 500,
    error: {
      message: err.message | "IntervalServerError",
    },
  });
};

module.exports = {
  NotFoundError,
  ErrorHandler,
};
