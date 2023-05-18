const { Router } = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const User = require("../controller/User");


const UserRouter = Router()

UserRouter.get('/info/myprofile', authMiddleware, User.getYourProfileController)

UserRouter.get('/:id', User.getProfileController)

UserRouter.post('/update', authMiddleware, User.updateProfileDataController)

module.exports = UserRouter;