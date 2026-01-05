const { Router } = require('express');
const indexRouter = Router();
const db = require('../db.js');
const validateMessage = require('../controllers/messagesFormValidation.js');

indexRouter.get('/', (req, res) => {
  res.render('index', {
    title: 'Mini MessageBoard',
    messages: db.defaultMessages,
  });
});

indexRouter.get('/new', (req, res) => {
  res.render('form', { title: 'Send us your message!', error: null });
});

indexRouter.post('/new', validateMessage, (req, res) => {
  const formResponse = req.body;

  db.defaultMessages.push({
    id: db.defaultMessages.length,
    text: formResponse.message,
    user: formResponse.author,
    added: new Date().toISOString().split('.')[0].split('T').join(' '),
  });

  res.redirect('/');
});

module.exports = indexRouter;
