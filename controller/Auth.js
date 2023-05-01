const {validationResult} = require('express-validator')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config();


const generateAccessToken = (id) => {
    const payload = {id}

    return jwt.sign(payload, process.env.jwt_key, {expiresIn: '24h'})
}
const registrationController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {name, email, password, age} = req.body;

        const candidate = await UserModel.findOne({email});
        if(candidate)
            return res.status(400).json({message: "Такой Email уже зарегистрирован"});

        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new UserModel({name, email, password: hashPassword, age});

        await user.save();

        res.status(201).json({message: "User reg"});

    } catch (err) {
        res.status(500).send(err);
    }
}

const loginController = async (req, res) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if(!errors)
        return res.status(400).json({message: errors});


    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).send("Invalid email or password");
        }

        const token = generateAccessToken(user._id);
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};


module.exports = {
    registrationController,
    loginController
}