const { Router } = require('express');

const messagesController = require('../controllers/messagesController');

const messagesRouter = Router();

messagesRouter.get('/:messageId', messagesController.messageDetailsGet);

module.exports = messagesRouter;
