const {body} = require('express-validator')

const createEventVaidator = [
    body('title').isEmpty(),
    body('description').isEmpty(),
    body('capacity').isInt().isLength({max: 999}),
]