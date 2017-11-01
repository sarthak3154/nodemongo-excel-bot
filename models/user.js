const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: String,
    uid: String,
    fbToken: String,
    name: String,
    gender: String,
    fbPhotoUrl: String,
    photo: {
        public_host: String,
        public_id: String,
        version: String
    },
    loc: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d'      // create the geospatial index
    },
    fcmToken: String
})

const User = mongoose.model('User', userSchema)
module.exports = User

