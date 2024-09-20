const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/users', require('./user'));
router.use('/year_inf', require('./year_inf'));
router.use('/menu', require('./menu'));

module.exports = router;