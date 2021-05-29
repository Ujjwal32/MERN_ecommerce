const express = require('express')
const router = express.Router()

const { signUp, updateUser, logIn, deleteUser, getUsers } = require('../controllers/userController')
const verifyUser = require('../middlewares/verifyUser')

router
    .route('/')
    .get(verifyUser,getUsers)
    .post(signUp)

router  
    .route('/login')
    .post(logIn)

router
    .route('/:id')
    .put(updateUser)
    .delete(deleteUser)



module.exports = router;