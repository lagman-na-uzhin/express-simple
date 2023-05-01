const {body} = require('express-validator')
const registrationValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 50 }).withMessage('Name must be less than 255 characters'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('age')
        .notEmpty().withMessage('Age is required')
        .isInt().withMessage('Age must be an integer')
        .isLength({ max: 3 }).withMessage('Age must be less than 3 digits')
]

const loginValidator = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
]

module.exports = {
    registrationValidator,
    loginValidator
}