const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.json({ message: "Пользователь не авторизован" }).status(400);
        }

        const decoded = jwt.verify(token, process.env.jwt_key);
        req.userData = decoded;
        next();
    } catch (e) {
        console.log(e);
        res.json({ message: "Пользователь не авторизован" }).status(400);
    }
};


