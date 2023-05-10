const UserModel = require('../models/User')


const getAboutProfileController = async (req, res) => {
try {
    const userId = req.userData.id

    const userInfo = await UserModel.findById(userId)
    if(!userInfo)
        res.status(400).json({message: 'Не удалось найти информацию об этом пользователе'})

    res.json({userInfo}).status(200)
    } catch (e) {
    console.log(e)
    }

}

module.exports = getAboutProfileController;