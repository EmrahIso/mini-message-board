const CustomNotFoundError = require('../errors/CustomNotFoundError.js');
const { getMessageDataById } = require('../db/queries');

exports.messageDetailsGet = async (req, res) => {
  const messageId = Number(req.params.messageId);

  const message = await getMessageDataById({ messageId });

  if (!message) {
    throw new CustomNotFoundError('Message Not Found');
  }

  res.render('message', { title: 'Message Details', message });
};
