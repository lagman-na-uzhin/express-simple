const {validationResult} = require('express-validator')
const EventModel = require('../models/Event')
const UserModel = require('../models/User')

const createEventController = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({message: errors})

        const {title, description, date, category, capacity, participants, tags, imageUrl, location} = req.body
        const organizer = req.userData.id

        const event = new EventModel({title, description, date, category, capacity, organizer, participants, tags, imageUrl, location })

        await event.save()
        res.json({message: "ok.."})
    } catch (err) {
        console.log(err)
    }
}

const getEventController = async (req, res) => {
    try {
        const id = req.params.id
        const event = await EventModel.findOne({_id: id})
        if(!event)
            return res.json({message: "Такой событий нет"}.status(400))

        res.status(200).json({event})
    } catch (e) {
        console.log(e)
    }

}
const getAllEventController = async (req, res) => {
    try {
        const events = await EventModel.find()
        if(!events)
            return res.json({message: "Нет событий"})

        res.send(events).status(200)
    } catch (e) {
        console.log(e)
    }
}

const joinEventController = async (req, res) => {
    try {
        const eventid = req.params.id
        const event = await EventModel.findById({_id: eventid})

        if(event) {
            const userid = req.userData.id

             const findUserInArray = event.participants.find(obj=>obj._id.toString()===userid.toString())
             if (findUserInArray) {
                 return res.json({message: "вы уже joined"}).status(400)
             }

            const checkCapacity = event.participants.length < event.capacity
            if(!checkCapacity){
                return res.json({message: 'Уже полный'}).status(400)
            }
            const user = await UserModel.findById(userid)
            event.participants.push({_id: user._id, name: user.name, avatarUrl: user.avatarUrl});
            await event.save()
            res.json({message: 'user joined'}).status(200)
        }

        res.status(400).json({message:'error'})
    } catch (e) {
        console.log(e)
    }
}

const getMyEventsController = async (req, res)=>{
    try{
        const userid = req.userData.id

        const event = await EventModel.find({organizer: userid})

        if(event.length === 0) {
            return res.status(200).json({ message: "У вас еще нет созданных событий" });
        }

        res.status(200).json(event)



    } catch (e) {
        console.log(e)
        res.json(e).status(500)
    }

}

module.exports = {
    createEventController,
    getAllEventController,
    getEventController,
    joinEventController,
    getMyEventsController

}