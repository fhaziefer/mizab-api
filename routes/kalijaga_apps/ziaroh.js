const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../../config/database/mysql');
const controller = require('../../controller/index');

// USER GET
router.get('/search', controller.ziaroh.searchZiaroh);
router.get('/:ziaroh_id', controller.ziaroh.getOneZiaroh);

module.exports = router;