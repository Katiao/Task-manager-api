//we get the error argument via async wrapper which includes a next() which passes it
//to next middleware. If we don't include this then built-in error handler
//will be used

//TODO: fix custom error, always getting general error (500)

const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
