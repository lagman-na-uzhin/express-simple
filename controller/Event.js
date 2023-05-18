const {validationResult} = require('express-validator')
const EventModel = require('../models/Event')
const UserModel = require('../models/User')
const CommentModel = require('../models/Comment')

const createEventController = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({message: errors})

        const {title, description, date, category, capacity, participants, tags, imageUrl, location} = req.body
        const organizer = req.userData.id

        const event = new EventModel({title, description, date, category, capacity, organizer, participants, tags, imageUrl, location })

        await event.save()
        res.status(200).json({message: "ok.."})
    } catch (err) {
        console.log(err)
    }
}

const getEventController = async (req, res) => {
    try {
        const id = req.params.id
        const event = await EventModel.findById(id)
        if(!event)
            return res.status(400).json({message: "Такой событий нет"})

        res.status(200).json({event})
    } catch (e) {
        console.log(e)
    }

}
const getAllEventController = async (req, res) => {
    try {
        const events = await EventModel.find()
        if(!events)
            return res.status(400).json({message: "Нет событий"})

        res.status(200).send(events)
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

             if(event.participants.lenght > 0) {
                 const findUserInArray = event.participants.find(obj => obj.userid.toString() === userid.toString())
                 if (findUserInArray) {
                     return res.status(400).json({message: "вы уже joined"})
                 }
             }

            const checkCapacity = event.participants.length < event.capacity
            if(!checkCapacity){
                return res.status(400).json({message: 'Уже полный'})
            }
            const user = await UserModel.findById(userid)
            console.log(user, 'userrrrrr')

            const {_id, firstname, lastname, avatar} = user
            event.participants.push({userid: _id, firstname, lastname, avatar});
            await event.save()
            res.status(200).json({message: 'user joined'})
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

const addCommentController = async (req, res) => {
    try {
        const userid = req.userData.id
        const user = await UserModel.findById(userid)

        const {text} = req.body
        const comment = new CommentModel({
            author:
                    {firstname: user.firstname,
                        lastname: user.lastname,
                        avatar: user.avatar,
                        authorid: user._id}, text})

        await comment.save()

        const eventid = req.params.id
        const event = await EventModel.findById(eventid)
        if(event)
            event.comments.push(comment._id)
            await  event.save()

        res.status(200).json(event)
    } catch (e) {
        res.status(500).json(e)
        console.log(e)
    }
}

const getCommentsController = async (req, res) => {
try{
    const eventid = req.params.id
    const event = await EventModel.findById(eventid)


    const commentsArr = []

    for (const element of event.comments) {
        const id = element._id
        const commentData = await CommentModel.findById(id)
        commentsArr.push(commentData)
    }

    res.status(200).json(commentsArr)
} catch (e) {
    res.status(500).json(e)
}

}

module.exports = {
    createEventController,
    getAllEventController,
    getEventController,
    joinEventController,
    getMyEventsController,
    addCommentController,
    getCommentsController

}