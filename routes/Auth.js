const { Router } = require('express')
const {registrationController, loginController} = require('../controller/Auth')

const AuthRouter = Router()

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

AuthRouter.post('/signup', registrationController)
// upload.single('avatar')

AuthRouter.post('/signin', loginController)

module.exports = AuthRouter