const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    post: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'posts',
        default: []
    }
})

const categoryModel = mongoose.model('categories', categorySchema)
module.exports = categoryModel