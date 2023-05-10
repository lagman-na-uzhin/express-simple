const { Router } = require('express')
const {registrationValidator, loginValidator} = require('../validation/authValidator')
const {registrationController, loginController} = require('../controller/Auth')
const {body} = require("express-validator");

const AuthRouter = Router()


AuthRouter.post('/signup',[
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 50 }).withMessage('Name must be less than 50 characters')
        .isAlphanumeric()
        .withMessage('Input data must contain only alphanumeric characters'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], registrationController)

AuthRouter.post('/signin', loginValidator, loginController)

module.exports = AuthRouter