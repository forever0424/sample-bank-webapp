const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sanitize = require('sanitize');
const morgan = require('morgan');
const swagger = require('swagger-ui-express');
const { v4: uuidv4 } = require('uuid');

const swaggerDocument = require('./docs/swagger');
const logger = require('./common/logger');
const routes = require('./routes');
const { NotFoundError } = require('./common/errors');
const { isDev, isTest, checkRequiredVars } = require('./common/utils');

checkRequiredVars([
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
]);
require('./db');

const app = express();

app.set('port', process.env.PORT || 4020);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(sanitize.middleware);
app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});
app.use(
  morgan((tokens, req, res) => {
    logger.http(
      [
        req.id,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
      ].join(' '),
    );
  }),
);

/* istanbul ignore next */
if (!isDev() && !isTest()) {
  // eslint-disable-next-line no-unused-vars
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });
}

app.use('/api/docs', swagger.serve, swagger.setup(swaggerDocument));
app.use('/api/v1', routes);

/* istanbul ignore next */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err) {
    logger.error(err.stack);

    if (!err.status) return res.status(500).json();
    return res.status(err.status).send({ error: err.message });
  }
  const { status, message } = NotFoundError();
  return res.status(status).send(message);
});

module.exports = app;
