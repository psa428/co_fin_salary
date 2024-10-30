const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/users', require('./user'));
router.use('/year_inf', require('./year_inf'));
router.use('/menu', require('./menu'));
router.use('/month_inf', require('./month_inf'));
router.use('/month_nss', require('./month_nss'));
router.use('/staff_inf', require('./staff_inf'));


module.exports = router;