const { Router, raw} = require('express')
const {validationResult} = require("express-validator");
const EventModel = require("../models/Event");
const EventRouter = Router()
const EventController = require('../controller/Event')
const authMiddleware = require('../middleware/authMiddleware')
const {joinEventController} = require("../controller/Event");

EventRouter.get('/list', EventController.getAllEventController)

EventRouter.get('/:id', EventController.getEventController )

EventRouter.post('/create', authMiddleware, EventController.createEventController)

EventRouter.get('/join/:id', authMiddleware, joinEventController)


module.exports = EventRouter