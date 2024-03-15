const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db2 = require('../../config/database/mysql2');
const controller = require('../../controller/index');

router.get('/submenu=:submenu_id/', controller.kategori.getAll);
router.get('/submenu=:submenu_id/search', controller.kategori.getSearch);
router.get('/:kategori_id', controller.kategori.getOne);

module.exports = router;