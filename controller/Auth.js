const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config();

const generateAccessToken = (id) => {
    const payload = {id}
    return jwt.sign(payload, process.env.jwt_key, {expiresIn: '24h'})
}
const registrationController = async (req, res) => {
    try {const {firstname, lastname, email, password, age, interest, location } = req.body;

        const candidate = await UserModel.findOne({email});
        if(candidate)
            return res.status(400).json({message: "Такой Email уже зарегистрирован"});

        const hashPassword = bcrypt.hashSync(password, 7)

        const user = new UserModel({firstname, lastname, email, password: hashPassword, age, interest, location})
        await user.save();

        res.status(201).json({message: "Пользователь успешно зарегистрирован"});

    } catch (err) {
        res.status(500).send(err);
    }
}

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).send("Invalid email or password");
        }

        const token = generateAccessToken(user._id);
        res.status(200).json({token});
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};


module.exports = {
    registrationController,
    loginController
}