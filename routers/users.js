const express = require('express');

const router = require('express-promise-router')();
const passport = require('passport');
// const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const userController = require('../controllers/users');

const passportSignin = passport.authenticate('local', { session: false});
const passportJWT = passport.authenticate('jwt', { session:false });

// const router = new Router;
router.route('/signup')
    .post(validateBody(schemas.authSchema), userController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignin, userController.signIn);

router.route('/secret')
    .get(passportJWT, userController.secret);

module.exports = app;

