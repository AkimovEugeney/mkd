const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    frontDoor: {type: String},
    appartamentNumber: {type: Number},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: [{type: Types.ObjectId, ref: 'Post'}]
})

module.exports = model('User', schema)