const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../../config/database/mysql');
const controller = require('../../controller/index');

// SEARCH DATA MUSTAHIQ
router.get('/purna/search', controller.user_data.getSearchPurna);
router.get('/nonpurna/search', controller.user_data.getSearchNonPurna);

// SEARCH DATA MAHASANTRI
router.get('/mahasantri/search', controller.user_data.getSearchSiswa);

// GET SEMUA DATA
router.get('/', controller.user_data.getAll);

// GET DATA BY ID
router.get('/:user_data_id', controller.user_data.getOne);

// MUTASI MAHASANTRI
router.patch('/mahasantri/mutasi/:user_data_id', controller.user_data.mutasi)
router.patch('/mahasantri/unmutasi/:user_data_id', controller.user_data.undoMutasi)

module.exports = router;