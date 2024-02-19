const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    userId: {type: Types.ObjectId, ref: 'User'},
    title: {type: String},
    des: {type: String}
})

module.exports = model('Questions', schema)