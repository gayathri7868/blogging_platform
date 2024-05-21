const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    _postId: {
        type: Number
    },
    title: {
        type: String, require: true
    },
    content: {
        type: String, require: true
    },
    category: {
        type: String, require: true
    },
    tags: {
        type: [String], require: true, default: []
    },
    likes: {
        type: Number, require: true, default: 0
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comment',
        default: []
    },
    createdAt: {
        type: Date
    }
})
const postModel = mongoose.model('post', postSchema)
module.exports = postModel