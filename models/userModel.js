const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: String,

    password: String,

    email: String,

    phone: String,

    image: {
        type: String,
        default: null,
        required: false
    }
});


module.exports = mongoose.model('users', userSchema);




