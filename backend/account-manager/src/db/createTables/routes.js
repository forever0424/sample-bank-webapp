const router = require('express').Router();
const createTables = require('./controller');

// eslint-disable-next-line no-unused-vars
router.post('/', async (req, res, next) => {
  try {
    await createTables();
    return res.status(200).json('OK');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
