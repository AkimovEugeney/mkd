const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    owner : {type: Types.ObjectId, ref:"User"},
    title: {type:String},
    description: {type:String},
    appartamentNumber: {type: Number},
    firstName: {type: String},
    lastName: {type: String},
    active: {type: Boolean},
    date: {type: String},
    numberFor:{type: Number},
    numberOf:{type: Number},
    whoVoted:[{type: Types.ObjectId, ref:"User"}],
    content :{type: Object}
})

module.exports = model('Post', schema)