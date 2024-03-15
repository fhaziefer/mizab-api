const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db2 = require('../../config/database/mysql2');
const controller = require('../../controller/index');

router.get('/', controller.menu.getAll);
router.get('/search', controller.menu.getSearch);
router.get('/:menu_id', controller.menu.getOne);

module.exports = router;