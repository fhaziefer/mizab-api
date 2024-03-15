const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../../config/database/mysql');
const controller = require('../../controller/index');

// USER GET
router.get('/search', controller.user.getSearch);
router.get('/:user_id', controller.user.getOneById);
router.get('/username/:username', controller.user.getOneByUsername);

// USER PATCH
router.patch('/update_username/:user_id', controller.user.updateUsername);
router.patch('/update_password/:user_id', controller.user.updatePassword);
router.patch('/update_data/:user_id', controller.user.updateData);

// DROP ACCOUNT
router.patch('/update_data/:user_id', controller.user.updateData);

module.exports = router;