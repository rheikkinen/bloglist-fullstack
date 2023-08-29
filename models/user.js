const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// user has a username, password and name
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
    },
    password: String,
    name: String,
})

userSchema.plugin(uniqueValidator, { message: 'Username must be unique' })

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User