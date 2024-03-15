const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db2 = require('../../config/database/mysql2');
const controller = require('../../controller/index');

router.get('/menu=:menu_id/', controller.submenu.getAll);
router.get('/menu=:menu_id/search', controller.submenu.getSearch);
router.get('/:submenu_id', controller.submenu.getOne);

module.exports = router;