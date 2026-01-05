const defaultMessages = [
  {
    id: 0,
    text: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    user: 'Amando',
    added: new Date().toISOString().split('.')[0].split('T').join(' '),
  },
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    user: 'Charles',
    added: new Date().toISOString().split('.')[0].split('T').join(' '),
  },
];

async function getMessageDataById(messageId) {
  return defaultMessages.find((message) => message.id === messageId);
}

module.exports = { defaultMessages, getMessageDataById };
