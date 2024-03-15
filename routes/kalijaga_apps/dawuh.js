const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../../config/database/mysql');
const controller = require('../../controller/index');

router.post('/input', controller.dawuh.inputDawuh);
router.get('/search', controller.dawuh.searchDawuh);
router.patch('/update/:dawuh_id', controller.dawuh.updateDawuh);
router.get('/:dawuh_id', controller.dawuh.satuDawuh);
router.delete('/delete/:dawuh_id', controller.dawuh.deleteDawuh)

module.exports = router;