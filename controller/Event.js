const {validationResult} = require('express-validator')
const EventModel = require('../models/Event')

const createEventController = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({message: errors})

        const {title, description, date, categoty, capacity, participants, tags, imageUrl} = req.body
        const organizer = req.userid.id

        const event = new EventModel({title, description, date, categoty, capacity, organizer, participants, tags, imageUrl, })

        await event.save()
        res.json({message: "ok.."})
    } catch (err) {
        console.log(err)
    }
}

const getEventController = async (req, res) => {
    try {
        const id = req.params._id

        const event = await EventModel.findOne(id)
        if(!event)
            return res.json({message: "Такой событий нет"})

        res.json({event})
    } catch (e) {
        console.log(e)
    }

}
const getAllEventController = async (req, res) => {
    try {
        const events = await EventModel.find()
        if(!events)
            return res.json({message: "Нет событий"})

        res.send(events)
    } catch (e) {
        console.log(e)
    }
}



module.exports = {
    createEventController,
    getAllEventController,
    getEventController,

}