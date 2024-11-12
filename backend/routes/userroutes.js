const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller');

router.post('/users', usercontroller.createUser);
router.get('/users/:id', usercontroller.getUser);

module.exports = router;