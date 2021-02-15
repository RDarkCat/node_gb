const express = require('express');
const controllers = require('../controllers');
const passport = require("passport");

const router = express.Router();

router.get('/login/', controllers.auth.getLogin);
router.post('/login/', controllers.auth.postLogin);
router.post('/logout/', controllers.auth.postLogout);
router.get('/signup/', controllers.auth.getSignup);
router.post('/signup/', controllers.auth.postSignup);
router.get('/vkontakte/', passport.authenticate('vkontakte'), controllers.auth.vkLogin);
router.get('/vkontakte/callback/', passport.authenticate('vkontakte', {
    successRedirect: '/',
    failureRedirect: '/login'
}), controllers.auth.vkCallback);

module.exports = router;