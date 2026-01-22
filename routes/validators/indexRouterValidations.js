const { body } = require('express-validator');

const indexRouterPostNewValidation = [
  body('author').trim().notEmpty().withMessage('Author name is required.'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message name is required.')
    .isLength({ min: 1, max: 200 })
    .withMessage('Message must be between 1 and 200 characters.'),
];

module.exports = indexRouterPostNewValidation;
