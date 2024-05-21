const categoryModel = require('../models/category.model')

async function getAllCategories(req, res) {

    try {
        const categories = await categoryModel.find()
        if (categories) {
            res.status(200).send(categories)
        }
        else {
            res.status(404).send("no category")
        }
    }
    catch (err) {

        res.status(404).send("Cannot display category details ")
    }


}

async function getPostsByCategory(req, res) {
    try {
        const name = req.params.name
        const categories = await categoryModel.find({ name: name })
        if (categories) { return res.status(200).send(categories) }
        res.status(404).send("category does not exist")
    }
    catch (err) {
        res.send("error")
    }
}
async function createCategory(req, res) {
    try {
        const category = await categoryModel.create({
            name: req.body.name
        })
        if (!category) { res.status('404').send('cannot create') }
        else {
            res.status(200).send(category)
        }
    }

    catch (err) {
        res.send("error")
    }
}

const categoryMethods = { createCategory, getAllCategories, getPostsByCategory }
module.exports = categoryMethods
