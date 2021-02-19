const express = require('express');
const controllers = require('../controllers')

const router = express.Router();

router.get('/', controllers.galaxy.index);
router.post('/', controllers.galaxy.store);

module.exports = router;