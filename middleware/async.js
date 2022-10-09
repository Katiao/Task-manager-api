//this will remove repetition in the controllers - we take the
//function and return it with the async / try catch

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // this passes it to next middleware
      next(error);
    }
  };
};

module.exports = asyncWrapper;
