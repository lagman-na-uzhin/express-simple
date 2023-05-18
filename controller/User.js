const UserModel = require('../models/User')

const getYourProfileController = async (req, res) => {
try {
    const userId = req.userData.id

    const userInfo = await UserModel.findById(userId)
    if(!userInfo)
        return res.status(400).json({message: 'Не удалось найти информацию об этом пользователе'})

    res.status(200).json({userInfo})
    } catch (e) {
        res.status(500).send(e)
    }

}

const getProfileController = async (req, res) => {
    try{
        const userid = req.params.id

        const profileData = await UserModel.findById(userid)
        const {firstname, lastname,age, location, interest} = profileData

        if(!profileData)
            res.status(400).json({message: 'Такого пользователя не найдено'})

        res.status(200).json({firstname, lastname, age, location, interest})
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}

const updateProfileDataController = async (req, res) => {
    try{

        const userId = req.userData.id
        const {firstname, lastname, age, interest, location, avatar} = req.body

        const user = await UserModel.findByIdAndUpdate(userId,{firstname, lastname, age, interest, location, avatar})
        res.json({message: 'ok'}).status(200)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}

module.exports = {
    getYourProfileController,
    updateProfileDataController,
    getProfileController
}