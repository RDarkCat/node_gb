const express = require('express');
const controllers = require('../../controllers')

const router = express.Router();

router.get('/', controllers.api.auth.checkJWT, controllers.api.galaxy.getTasks);
router.post('/', controllers.api.auth.checkJWT, controllers.api.galaxy.createTask);

module.exports = router;