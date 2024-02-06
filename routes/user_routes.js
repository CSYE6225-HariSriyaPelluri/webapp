const {authenticate, authNotValid} = require('../middleware/checkAuth')
const express = require('express');
const router = express.Router();
const {getUserDetails, addUser, updateUser}=require('../controllers/user_controllers');
const { addUserValidation, updateUserValidation } = require('../helpers/validateData');
const checkBody = require('../middleware/checkBody');

router.get('/self', checkBody, authenticate, getUserDetails)

router.put('/self', updateUserValidation, authenticate, updateUser)

router.post('/', authNotValid, addUserValidation, addUser)

module.exports = router