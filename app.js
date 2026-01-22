const express = require('express');
const path = require('node:path');
const helmet = require('helmet');

if (process.env.NODE_ENV) {
  const dotenv = require('dotenv');
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

const indexRouter = require('./routes/indexRouter');
const messagesRouter = require('./routes/messagesRouter');
const initDB = require('./db/populatedb');
const databaseHealthCheck = require('./db/queries');

const assetsPath = path.join(__dirname, 'public');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/messages', messagesRouter);

app.get('/health', async (req, res) => {
  const health = await databaseHealthCheck();
  res.status(200).json(health);
});

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

(async () => {
  try {
    await initDB();
    console.log('✅ DB initialized');

    app.listen(PORT, () => {
      console.log('Server running on port:', PORT);
    });
  } catch (error) {
    console.error('❌ DB initialization failed:', error);
    process.exit(1);
  }
})();
