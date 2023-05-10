const { Router } = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const getAboutProfileController = require('../controller/User')

const UserRouter = Router()

UserRouter.get('/info', authMiddleware, getAboutProfileController)

module.exports = UserRouter;