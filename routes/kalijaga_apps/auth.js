const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../../config/database/mysql');
const controller = require('../../controller/index');

router.patch('/signup/mahasantri/:stambuk', controller.auth.masSignup);
router.patch('/signup/:userId', controller.auth.userSignup);
router.post('/signup', controller.auth.signup);
router.post('/login', controller.auth.login);

module.exports = router;