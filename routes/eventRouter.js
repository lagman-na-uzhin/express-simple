const { Router} = require('express')
const EventController = require('../controller/Event')
const authMiddleware = require('../middleware/authMiddleware')

const EventRouter = Router()

EventRouter.get('/list', EventController.getAllEventController)

EventRouter.get('/:id', EventController.getEventController )

EventRouter.post('/create', authMiddleware, EventController.createEventController)

EventRouter.get('/join/:id', authMiddleware, EventController.joinEventController)

EventRouter.get('/my/events', authMiddleware, EventController.getMyEventsController)

EventRouter.post('/:id/addcomment', authMiddleware, EventController.addCommentController)

EventRouter.get('/:id/getcomments', EventController.getCommentsController)


module.exports = EventRouter