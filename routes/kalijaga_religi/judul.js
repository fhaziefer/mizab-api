const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db2 = require('../../config/database/mysql2');
const controller = require('../../controller/index');

router.get('/kategori=:kategori_id/', controller.judul.getAll);
router.get('/kategori=:kategori_id/search', controller.judul.getSearch);
router.get('/:judul_id', controller.judul.getOne);

module.exports = router;