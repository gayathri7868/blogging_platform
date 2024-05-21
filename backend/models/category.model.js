const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

const categoryModel = mongoose.model('category', categorySchema)
module.exports = categoryModel