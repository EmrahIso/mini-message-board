const { Router } = require('express');
const db = require('../db.js');
const CustomNotFoundError = require('../errors/CustomNotFoundError.js');

const messagesRouter = Router();

messagesRouter.get('/:messageId', async (req, res) => {
  const message = await db.getMessageDataById(Number(req.params.messageId));

  if (!message) {
    throw new CustomNotFoundError('Message Not Found');
  }

  res.render('message', { title: 'Message Details', message });
});

module.exports = messagesRouter;
