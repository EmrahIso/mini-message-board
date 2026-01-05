const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');
const messagesRouter = require('./routes/messagesRouter');

const assetsPath = path.join(__dirname, 'public');
const PORT = 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use('/', indexRouter);
app.use('/messages', messagesRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found Page' });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.statusCode === 400) {
    return res.status(400).render('form', {
      title: 'Send us your message!',
      error: err.message,
    });
  }

  if (err.statusCode === 404) {
    return res.status(404).render('404', { title: 'Not Found Page' });
  }

  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});
