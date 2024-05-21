const postModel = require('../models/post.model')
const categoryModel = require('../models/category.model')

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

        const posts = await postModel.create({
            userId: req.id,
            title: req.body.title,
            content: req.body.content,
            createdAt: req.body.createdAt,
            category: req.body.category


        })
        categ = posts.category
        console.log(categ)
        const categories = await categoryModel.findOne({ name: categ })
        console.log(categories)
        if (categories) {
            categories.post.push(posts)
            console.log("&&", categories)
            categories.save()
        }
        else {
            const newCategories = await categoryModel.create({ categ })
            newCategories.post.push(posts)
            newCategories.save()
        }
        res.send(posts)
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