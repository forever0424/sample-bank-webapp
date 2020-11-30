'use strict';

const express = require('express');
const { NotFoundError } = require('../../common/errors');

const healthCheck = require('./components/health/routes');
const createTables = require('./db/createTables/routes');
const dropTables = require('./db/dropTables/routes');
const populateTables = require('./db/populateTables/routes');

const router = express.Router();

// Application
router.use('/health', healthCheck);

// DB
if (process.env.IS_OFFLINE) {
  router.use('/create-tables', createTables);
  router.use('/drop-tables', dropTables);
  router.use('/populate-tables', populateTables);
}

// eslint-disable-next-line no-unused-vars
router.use('*', (req, res, next) => {
  if (req.url === '/') return next();
  next(NotFoundError());
});

module.exports = router;