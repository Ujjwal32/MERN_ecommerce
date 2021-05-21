const express = require('express')
const router = express.Router()

const { signUp, updateUser, logIn, deleteUser } = require('../controllers/userController')

router
    .route('/')
    .post(signUp)

router  
    .route('/login')
    .post(logIn)

router
    .route('/:id')
    .put(updateUser)
    .delete(deleteUser)



module.exports = router;