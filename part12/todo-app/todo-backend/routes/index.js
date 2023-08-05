const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')
const { getAsync, setAsync } = require('../redis')

let visits = 0


/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET Stats Redis (Todos count) */
router.get('/stats', async (req, res) => {
  const todos = await getAsync('added_todos') || 0;
  res.status(200).json({ "added_todos": todos });
});

module.exports = router;
