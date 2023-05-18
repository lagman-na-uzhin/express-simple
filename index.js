const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/router');
const AuthRouter = require('./routes/Auth');
const EventRouter = require('./routes/eventRouter')
const UserRouter = require('./routes/userRouter')

require('dotenv').config();


const { port, db_url } = process.env;

const app = express();



app.use(cors())
app.use(express.json())
app.use(router)
app.use('/profile',UserRouter)
app.use('/auth', AuthRouter)
app.use('/event', EventRouter)

const main = async () => {
    await mongoose.connect(db_url);
    console.log('DB connected....');

    app.listen(port, () => console.log(`Server started on port ${port}...`));
};

main().catch((err) => console.log(err));
