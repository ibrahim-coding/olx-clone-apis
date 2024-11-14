require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes')


const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then( () => {
    console.log('Database is connected')
})
.catch(error => console.log(error));


app.use('/user', userRouter)









app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}....`)
})