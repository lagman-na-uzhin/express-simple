const { Router } = require('express')
const {registrationValidator, loginValidator} = require('../validation/authValidator')
const {registrationController, loginController} = require('../controller/Auth')

const AuthRouter = Router()


AuthRouter.post('/signup',registrationValidator, registrationController)

AuthRouter.post('/signin', loginValidator, loginController)

module.exports = AuthRouter