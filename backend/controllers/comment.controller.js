const CommentModel = require('../models/comment.model')
const postModel = require('../models/post.model')

async function getCommentsForPost(req, res) {
    try {
        const comments = await CommentModel.find();
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}

async function deleteComment(req, res) {
    try {
        const { id } = req.params.id;
        const { postId } = req.params.postId;
        const comment = await CommentModel.findByIdAndDelete(id);
        if (!comment)
            res.status(404).json(`Comment with id:${id} does not exists`);
        else {
            res.status(200).json(`Comment with id:${id} is deleted`);
            const post = postModel.findById(postId)
            post.comments.pull(comment)

        }
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}

async function addComment(req, res) {
    try {
        const { postId } = req.params
        console.log("//", postId)
        const comment = await CommentModel.create({
            postId: postId,
            userId: req.id,
            content: req.body.content,
            createdAt: req.body.createdAt

        })
        console.log(comment)

        if (comment) {
            res.send(comment)
            const posts = await postModel.findById(postId)
            posts.comments.push(comment)
            await posts.save()
                .then((response) => { console.log(posts) })

        }
        else {
            res.send("error")
        }
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { addComment, getCommentsForPost, deleteComment }