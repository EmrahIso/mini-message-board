const { validationResult } = require('express-validator');

const indexRouterPostNewValidation = require('../routes/validators/indexRouterValidations');
const { getAllMessages, addNewMessageToDatabase } = require('../db/queries');

exports.indexGet = async (req, res) => {
  const messages = await getAllMessages();
  res.render('index', {
    title: 'Mini MessageBoard',
    messages: messages,
  });
};

exports.indexNewFormPost = [
  ...indexRouterPostNewValidation,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('form', {
        title: 'Send us your message!',
        errors: errors.array(),
      });
    }

    const { author, message } = req.body;

    await addNewMessageToDatabase({ username: author, text: message });

    res.redirect('/');
  },
];

exports.indexNewFormGet = (req, res) => {
  res.render('form', { title: 'Send us your message!', errors: null });
};
