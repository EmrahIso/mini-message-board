function validateMessage(req, res, next) {
  const formResponse = req.body;

  if (!formResponse.author || !formResponse.message) {
    const err = new Error('Invalid Input Data');
    err.statusCode = 400;
    return next(err);
  }

  next();
}

module.exports = validateMessage;
