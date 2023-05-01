const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.json({ message: "Пользователь не авторизован" });
        }

        const decoded = jwt.verify(token, process.env.jwt_key);
        if (!decoded) {
            return res.json({ message: "Неверный токен" });
        }

        req.userid = decoded;
        next();
    } catch (e) {
        console.log(e);
        res.json({ message: "Пользователь не авторизован" });
    }
};


