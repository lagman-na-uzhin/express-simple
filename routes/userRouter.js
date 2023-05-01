const { Router } = require('express')
const UserRouter = Router()
const authMiddleware = require('../middleware/authMiddleware')

UserRouter.get('/info', authMiddleware, (req, res) => {
    res.send('ok')
});

module.exports = UserRouter