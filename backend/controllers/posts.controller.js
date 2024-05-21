const postModel = require('../models/post.model')

async function updatePost(req, res) {
    try {
        const { id } = req.params;
        const post = await postModel.findByIdAndUpdate(id, req.body);
        if (!post)
            res.status(404).json(`Post with id:${id} doesnot exists`);
        else
            res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}

async function allPosts(req, res) {
    try {
        const posts = await postModel.find()
        res.send(posts)

    }
    catch (err) { console.log(err) }

}

async function getPostById(req, res) {
    try {
        const { id } = req.params
        const posts = await postModel.findById(id)
        res.send(posts)

    }
    catch (err) { console.log(err) }
}
async function createPost(req, res) {
    try {

        const post = await postModel.create({
            userId: req.id,
            title: req.body.title,
            content: req.body.content,
            catgeory: req.body.catgeory,

        })
        console.log("**", req.body)
        console.log(post)
        res.send(post)
    }
    catch (err) { console.log(err) }

}

async function deletePost(req, res) {
    try {
        const { id } = req.params;
        const post = await postModel.findByIdAndDelete(id);
        if (!post)
            res.status(404).json(`Post with id:${id} does not exists`);
        else
            res.status(200).json(`Post with id:${id} is deleted`);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
methods = { createPost, deletePost, updatePost, allPosts, getPostById }
module.exports = methods